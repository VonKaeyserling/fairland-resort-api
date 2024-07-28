import { InputType, Field, Float } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateHotelInput {
  @Field()
  name: string;

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

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
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
