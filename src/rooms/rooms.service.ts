import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

import { Room } from './entities/room.entity';

import { HotelsService } from '../hotels/hotels.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    private hotelService: HotelsService,
  ) {}

  async create(createRoomInput: CreateRoomInput) {
    const hotel = await this.hotelService.findOne(createRoomInput.hotel);

    const room = this.roomRepo.create({
      ...createRoomInput,
      hotel,
    });

    return this.roomRepo.save(room);
  }

  findAll() {
    return this.roomRepo.find({
      relations: ['hotel'],
    });
  }

  async findOne(id: string) {
    const room = await this.roomRepo.findOneBy({
      id,
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: string, updateRoomInput: UpdateRoomInput) {
    const room = await this.findOne(id);

    Object.assign(room, updateRoomInput);

    return this.roomRepo.save(room);
  }

  async remove(id: string) {
    const room = await this.findOne(id);

    return this.roomRepo.remove(room);
  }
}
