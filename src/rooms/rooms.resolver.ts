import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { RoomsService } from './rooms.service';

import { Room } from './entities/room.entity';

import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll() {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ) {
    return this.roomsService.update(id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => ID }) id: string) {
    return this.roomsService.remove(id);
  }
}
