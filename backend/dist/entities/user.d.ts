import { RoomEntity } from './room';
export declare class UserEntity {
    id: number;
    username: string;
    aboutMe: string;
    email: string;
    rooms: RoomEntity[];
    password: string;
}
