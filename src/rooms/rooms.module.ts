import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';

import { Room } from './entities/room.entity';

import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), HotelsModule],
  providers: [RoomsResolver, RoomsService],
})
export class RoomsModule {}
