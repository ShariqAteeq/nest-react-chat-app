import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { RoomI } from 'src/models';
import { UserService } from 'src/user/user.service';
import { ConnectedUserService } from '../services/connectedUser/connectedUser.service';
import { RoomService } from '../services/room/room.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private userService;
    private roomService;
    private connectedUserService;
    constructor(authService: AuthService, userService: UserService, roomService: RoomService, connectedUserService: ConnectedUserService);
    server: Server;
    handleMessage(client: any, payload: any): void;
    handleConnection(socket: Socket): Promise<boolean | void>;
    handleDisconnect(socket: Socket): Promise<void>;
    private disconnect;
    onCreateRoom(socket: Socket, room: RoomI): Promise<void>;
}
