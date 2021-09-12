import { RoomEntity } from 'src/entities/room';
import { UserEntity } from 'src/entities/user';
import { RoomI, UserI } from 'src/models';
import { Repository } from 'typeorm';
export declare class RoomService {
    private readonly roomRepo;
    private readonly userRepo;
    constructor(roomRepo: Repository<RoomEntity>, userRepo: Repository<UserEntity>);
    createRoom(room: RoomI, creator: UserI): Promise<RoomI>;
    getRoomsForUsers(userId: number): Promise<RoomI[]>;
    addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI>;
}
