import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { HotelsService } from './hotels.service';

import { Hotel } from './entities/hotel.entity';

import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Resolver(() => Hotel)
export class HotelsResolver {
  constructor(private readonly hotelsService: HotelsService) {}

  @Query(() => [Hotel])
  hotels() {
    return this.hotelsService.findAll();
  }

  @Query(() => Hotel)
  hotel(@Args('id', { type: () => ID }) id: string) {
    return this.hotelsService.findOne(id);
  }

  @Mutation(() => Hotel)
  createHotel(@Args('createHotelInput') createHotelInput: CreateHotelInput) {
    console.log(createHotelInput);

    return this.hotelsService.create(createHotelInput);
  }

  @Mutation(() => Hotel)
  updateHotel(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateHotelInput') updateHotelInput: UpdateHotelInput,
  ) {
    return this.hotelsService.update(id, updateHotelInput);
  }

  @Mutation(() => Hotel)
  removeHotel(@Args('id', { type: () => ID }) id: string) {
    return this.hotelsService.remove(id);
  }
}
