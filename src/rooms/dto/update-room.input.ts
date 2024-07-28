import { InputType, PartialType } from '@nestjs/graphql';

import { CreateRoomInput } from './create-room.input';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {}
