import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    title: String[];
    handleMessage(client: any, payload: any): void;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    private disconnect;
}
