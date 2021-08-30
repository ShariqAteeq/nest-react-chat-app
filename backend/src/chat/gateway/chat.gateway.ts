import { UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/user/user.service';
import { RoomService } from '../services/room/room.service';

@WebSocketGateway({
  cors: { origin: ['https://hoppscotch.io', 'http://localhost:3001'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.server.emit('message', 'test');
  }

  async handleConnection(socket: Socket) {
    console.log('on connect');
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket?.handshake?.auth?.token,
      );
      const user = await this.userService.findOne(decodedToken?.user?.id);
      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        const rooms = await this.roomService.getRoomsForUsers(user.id);

        // only emits room to the specific connected clients
        return this.server.to(socket.id).emit('rooms', rooms);
      }
    } catch (error) {
      console.log(error, 'error');
      return this.disconnect(socket);
    }
  }
  handleDisconnect(socket: Socket) {
    console.log('disconnect');
    return this.disconnect(socket);
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
