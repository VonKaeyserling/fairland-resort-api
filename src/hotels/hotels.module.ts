import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';

import { Hotel } from './entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [HotelsResolver, HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}
