import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateHotelInput {
  @Field()
  name: string;

  @Field()
  rating: number;

  @Field()
  shortDescription: string;

  @Field()
  description: string;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  images: string[];

  @Field()
  logo: string;

  @Field()
  slug: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Column()
  @Field()
  address: string;

  @Field()
  zipCode: string;

  @Field()
  addressNumber: string;

  @Field()
  neighborhood: string;

  @Field()
  state: string;

  @Field()
  city: string;
}
