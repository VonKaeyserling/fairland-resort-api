import { getRepositoryToken } from '@nestjs/typeorm';
import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';

import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';

describe('RoomsService', () => {
  let service: RoomsService;
  let repo: jest.Mocked<Repository<Room>>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(RoomsService).compile();

    service = unit;

    repo = unitRef.get(getRepositoryToken(Room) as string);
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});
