import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import {
//   IPaginationOptions,
//   paginate,
//   Pagination,
// } from 'nestjs-typeorm-paginate';
import { RoomEntity } from 'src/entities/room';
import { UserEntity } from 'src/entities/user';
import { RoomI, UserI } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createRoom(room: RoomI, creator: UserI): Promise<RoomI> {
    let newRoom = await this.addCreatorToRoom(room, creator);
    return this.roomRepo.save(newRoom);
  }

  async getRoomsForUsers(userId: number): Promise<RoomI[]> {
    const query = await this.roomRepo
      .createQueryBuilder('room')
      .leftJoin('room.users', 'user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updatedAt', 'DESC')
      .getMany();

    return query;
  }

  // async getRoomsForUsers(
  //   userId: number,
  //   options: IPaginationOptions,
  // ): Promise<Pagination<RoomI>> {
  //   const query = await this.roomRepo
  //     .createQueryBuilder('room')
  //     .leftJoin('room.users', 'user')
  //     .where('user.id = :userId', { userId });

  //   return paginate(query, options);
  // }

  async addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI> {
    room.users.push(creator);
    return room;
  }
}
