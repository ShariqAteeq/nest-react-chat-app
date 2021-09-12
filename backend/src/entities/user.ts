import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConnectedUserEntity } from './connectedUsers';
import { RoomEntity } from './room';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  aboutMe: string;
  
  @Column({ nullable: true })
  image: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => RoomEntity, (room) => room.users)
  rooms: RoomEntity[];

  @OneToMany(() => ConnectedUserEntity, connection => connection.user)
  connections: ConnectedUserEntity[];

  @Column({ select: false }) // dont get password by query directly
  password: string;
}
