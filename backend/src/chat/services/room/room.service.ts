import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/room';
import { RoomI, UserI } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
  ) {}

  async createRoom(room: RoomI, creator: UserI): Promise<RoomI> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    return this.roomRepo.save(newRoom);
  }

  async getRoomsForUsers(userId: number): Promise<RoomI[]> {
    const query = await this.roomRepo
      .createQueryBuilder('room')
      .leftJoin('room:users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return query;
  }

  async addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI> {
    room.users.push(creator);
    return room;
  }
}
