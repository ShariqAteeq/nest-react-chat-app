import { UserEntity } from './user';
export declare class ConnectedUserEntity {
    id: number;
    socketId: string;
    user: UserEntity;
}
