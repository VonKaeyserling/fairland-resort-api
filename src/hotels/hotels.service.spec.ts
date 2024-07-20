import { getRepositoryToken } from '@nestjs/typeorm';
import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';

import { HotelsService } from './hotels.service';

import { Hotel } from './entities/hotel.entity';

describe('HotelsService', () => {
  let service: HotelsService;
  let repo: jest.Mocked<Repository<Hotel>>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(HotelsService).compile();

    service = unit;

    repo = unitRef.get(getRepositoryToken(Hotel) as string);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('should return all hotels', async () => {
    const hotels = [new Hotel(), new Hotel()];

    repo.find.mockResolvedValue(hotels);

    expect(await service.findAll()).toBe(hotels);
  });
});
