import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  constructor(@InjectRepository(Hotel) private repo: Repository<Hotel>) {}

  create(createHotelInput: CreateHotelInput) {
    const hotel = this.repo.create(createHotelInput);

    return this.repo.save(hotel);
  }

  async findAll() {
    const hotels = await this.repo.find({
      relations: ['rooms'],
    });

    return hotels;
  }

  async findOne(id: string) {
    const hotel = await this.repo.find({
      where: { id },
      relations: ['rooms'],
    });

    if (!(hotel instanceof Array)) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel[0];
  }

  async update(id: string, updateHotelInput: UpdateHotelInput) {
    const hotel = await this.findOne(id);

    Object.assign(hotel, updateHotelInput);

    return await this.repo.save(hotel);
  }

  async remove(id: string) {
    const hotel = await this.findOne(id);

    const removedHotel = await this.repo.remove(hotel);

    return removedHotel;
  }
}
