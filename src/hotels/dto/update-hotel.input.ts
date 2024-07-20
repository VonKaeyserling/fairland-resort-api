import { InputType, PartialType } from '@nestjs/graphql';

import { CreateHotelInput } from './create-hotel.input';

@InputType()
export class UpdateHotelInput extends PartialType(CreateHotelInput) {}
