import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './room';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => RoomEntity, (room) => room.users)
  rooms: RoomEntity[];

  @Column({ select: false }) // dont get password by query directly
  password: string;
}
