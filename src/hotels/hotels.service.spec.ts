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

  describe('findOne', () => {
    it('should return a hotel', async () => {
      const hotel = new Hotel();

      repo.findOneBy.mockResolvedValue(hotel);

      expect(await service.findOne(hotel.id)).toBe(hotel);
    });

    it('should throw an error if hotel is not found', async () => {
      repo.findOneBy.mockResolvedValue(undefined);

      await expect(service.findOne('1')).rejects.toThrow('Hotel not found');
    });
  });

  describe('findAll', () => {
    it('should return all hotels', async () => {
      const hotels = [new Hotel()];

      repo.find.mockResolvedValue(hotels);

      expect(await service.findAll()).toBe(hotels);
    });
  });

  describe('create', () => {
    it('should create a hotel', async () => {
      const hotel = new Hotel();

      repo.save.mockResolvedValue(hotel);

      expect(await service.create(hotel)).toBe(hotel);
    });
  });

  describe('update', () => {
    it('should update a hotel', async () => {
      const hotel = new Hotel();

      repo.save.mockResolvedValue(hotel);
      repo.findOneBy.mockResolvedValue(hotel);

      expect(await service.update(hotel.id, hotel)).toBe(hotel);
    });
  });

  describe('remove', () => {
    it('should remove a hotel', async () => {
      const hotel = new Hotel();

      repo.remove.mockResolvedValue(hotel);
      repo.findOneBy.mockResolvedValue(hotel);

      expect(await service.remove(hotel.id)).toBe(hotel);
    });
  });
});
