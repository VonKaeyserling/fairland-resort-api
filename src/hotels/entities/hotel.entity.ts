import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Room } from '../../rooms/entities/room.entity';

@Entity()
@ObjectType()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({
    default: 0,
  })
  @Field()
  rating: number;

  @Column()
  @Field()
  shortDescription: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  thumbnail: string;

  @Column('simple-array')
  @Field(() => [String])
  images: string[];

  @Column()
  @Field()
  logo: string;

  @Column()
  @Field()
  slug: string;

  @Column('float')
  @Field(() => Float)
  latitude: number;

  @Column('float')
  @Field(() => Float)
  longitude: number;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  zipCode: string;

  @Column()
  @Field()
  addressNumber: string;

  @Column()
  @Field()
  neighborhood: string;

  @Column()
  @Field()
  state: string;

  @Column()
  @Field()
  city: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Room, (room) => room.hotel)
  @Field(() => [Room])
  rooms: Room[];

  // @Field()
  // admin:  User   @relation(fields: [userId], references: [id])

  // @Field()
  // userId: string;
}
