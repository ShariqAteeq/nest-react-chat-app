import { ROOMTYPE } from 'src/models';
import { UserEntity } from './user';
export declare class RoomEntity {
    id: number;
    name: string;
    type: ROOMTYPE;
    users: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
