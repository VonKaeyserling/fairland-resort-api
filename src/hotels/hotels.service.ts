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

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const hotel = await this.repo.findOneBy({
      id,
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel;
  }

  async update(id: string, updateHotelInput: UpdateHotelInput) {
    const hotel = await this.findOne(id);

    Object.assign(hotel, updateHotelInput);

    const updatedHotel = await this.repo.save(hotel);

    return updatedHotel;
  }

  async remove(id: string) {
    const hotel = await this.findOne(id);

    const removedHotel = await this.repo.remove(hotel);

    return removedHotel;
  }
}
