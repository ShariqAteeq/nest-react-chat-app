import { RoomEntity } from 'src/entities/room';
import { RoomI, UserI } from 'src/models';
import { Repository } from 'typeorm';
export declare class RoomService {
    private readonly roomRepo;
    constructor(roomRepo: Repository<RoomEntity>);
    createRoom(room: RoomI, creator: UserI): Promise<RoomI>;
    getRoomsForUsers(userId: number): Promise<RoomI[]>;
    addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI>;
}
