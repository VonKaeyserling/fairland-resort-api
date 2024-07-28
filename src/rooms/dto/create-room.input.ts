import { InputType, Field, Float, ID } from '@nestjs/graphql';

import { RoomAvaliability } from '../entities/room.entity';

@InputType()
export class CreateRoomInput {
  @Field()
  name: string;

  @Field()
  shortDescription: string;

  @Field()
  thumbnail: string;

  @Field()
  description: string;

  @Field(() => [String])
  images: string[];

  @Field(() => Float)
  price: number;

  @Field(() => RoomAvaliability)
  avaliability: RoomAvaliability;

  @Field(() => ID)
  hotel: string;
}
