import { UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: ['https://hoppscotch.io', 'http://localhost:3001'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  title: String[] = [];

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.server.emit('message', 'test');
  }

  async handleConnection(socket: Socket) {
    console.log('on connect');
    try {
      // console.log('socket', socket);
      this.title.push('value ' + Math.random().toString());
      this.server.emit('message', this.title);
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
