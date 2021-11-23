import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { ConnectedUserI, RoomI } from 'src/models';
import { UserService } from 'src/user/user.service';
import { ConnectedUserService } from '../services/connectedUser/connectedUser.service';
import { RoomService } from '../services/room/room.service';

@WebSocketGateway({
  cors: { origin: ['https://hoppscotch.io', 'http://localhost:3001'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private connectedUserService: ConnectedUserService,
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
        console.log("running disconnect")
      } else {
        socket.data.user = user;
        console.log('user', user);
        const rooms = await this.roomService.getRoomsForUsers(user.id);
        console.log('rooms', rooms);
        console.log('socket.id', socket.id);
        // only emits room to the specific connected clients
        // Save connection to DB
        await this.connectedUserService.create({ socketId: socket.id, user });
        return this.server.to(socket.id).emit('rooms', rooms);
      }
    } catch (error) {
      console.log(error, 'error');
      return this.disconnect(socket);
    }
  }
  async handleDisconnect(socket: Socket) {
    console.log('disconnect');
    await this.connectedUserService.deleteBySocketId(socket.id);
    // return this.disconnect(socket);
    // socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    // socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: RoomI) {
    // const myRooms = await this.roomService.getRoomsForUsers(
    //   socket.data.user.id,
    // );
    // const isExist = myRooms.filter((d) =>
    //   d.users.some((i) => i.id === room.users[0].id),
    // );

    // if (isExist.length > 0) {
    //   throw new WsException('Invalid credentials.');
    // }

    const createdRoom: RoomI = await this.roomService.createRoom(
      room,
      socket.data.user,
    );

    for (const user of createdRoom.users) {
      const connections: ConnectedUserI[] =
        await this.connectedUserService.findByUser(user);
      const rooms = await this.roomService.getRoomsForUsers(user.id);
      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
  }
}
