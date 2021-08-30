import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoomEntity } from 'src/entities/room';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './gateway/chat.gateway';
import { RoomService } from './services/room/room.service';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([RoomEntity])],
  providers: [ChatGateway, RoomService],
})
export class ChatModule {}
