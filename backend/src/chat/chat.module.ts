import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectedUserEntity } from 'src/entities/connectedUsers';
import { RoomEntity } from 'src/entities/room';
import { UserEntity } from 'src/entities/user';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './gateway/chat.gateway';
import { ConnectedUserService } from './services/connectedUser/connectedUser.service';
import { RoomService } from './services/room/room.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([RoomEntity, UserEntity, ConnectedUserEntity]),
  ],
  providers: [ChatGateway, RoomService, ConnectedUserService],
})
export class ChatModule {}
