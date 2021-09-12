import { ConnectedUserEntity } from 'src/entities/connectedUsers';
import { ConnectedUserI, UserI } from 'src/models';
import { Repository } from 'typeorm';
export declare class ConnectedUserService {
    private readonly connectedUserRepository;
    constructor(connectedUserRepository: Repository<ConnectedUserEntity>);
    create(connectedUser: ConnectedUserI): Promise<ConnectedUserI>;
    findByUser(user: UserI): Promise<ConnectedUserI[]>;
    deleteBySocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
