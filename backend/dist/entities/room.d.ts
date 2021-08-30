import { UserEntity } from './user';
export declare class RoomEntity {
    id: number;
    name: string;
    description: string;
    users: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
