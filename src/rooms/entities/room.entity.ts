import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from '../../hotels/entities/hotel.entity';

export enum RoomAvaliability {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

registerEnumType(RoomAvaliability, {
  name: 'RoomAvaliability',
});

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  shortDescription: string;

  @Column()
  @Field()
  thumbnail: string;

  @Column()
  @Field()
  description: string;

  @Column('simple-array')
  @Field(() => [String])
  images: string[];

  @Column('float')
  @Field(() => Float)
  price: number;

  @Column('float', {
    default: 0,
  })
  @Field(() => Float)
  rating: number;

  @Column({
    type: 'enum',
    enum: RoomAvaliability,
    default: RoomAvaliability.NOT_AVAILABLE,
  })
  @Field(() => RoomAvaliability)
  avaliability: RoomAvaliability;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Field(() => Hotel)
  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  // @Field()
  // bookings: Booking[]

  // @Field()
  // reviews:  Review[]
}
