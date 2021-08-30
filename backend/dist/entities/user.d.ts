import { RoomEntity } from './room';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    rooms: RoomEntity[];
    password: string;
}
