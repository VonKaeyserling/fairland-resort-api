import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';

import { RoomsService } from './rooms.service';
import { HotelsService } from '../hotels/hotels.service';

import { Room } from './entities/room.entity';

describe('RoomsService', () => {
  let service: RoomsService;
  let hotelService: jest.Mocked<HotelsService>;
  let repo: jest.Mocked<Repository<Room>>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(RoomsService).compile();

    service = unit;

    repo = unitRef.get(getRepositoryToken(Room) as string);
    hotelService = unitRef.get(HotelsService);
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(hotelService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a room', async () => {
      const mock = new Room();

      repo.findOneBy.mockResolvedValue(mock);

      const room = await service.findOne(mock.id);

      expect(room).toBe(mock);
    });

    it('should throw an error if room is not found', async () => {
      repo.find.mockResolvedValue(undefined);

      try {
        await service.findOne('1');
      } catch (error) {
        const err: NotFoundException = error;

        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('Room not found');
      }
    });
  });

  describe('create', () => {
    it('should create a new room', async () => {
      const mockRoom = new Room();

      repo.create.mockReturnValue(mockRoom);
      repo.save.mockResolvedValue(mockRoom);

      const room = await service.create({
        ...mockRoom,
        hotel: '',
      });

      expect(repo.create).toHaveBeenCalledWith(mockRoom);
      expect(repo.save).toHaveBeenCalledWith(mockRoom);
      expect(room).toBe(mockRoom);
    });
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const mockRooms = [new Room(), new Room()];

      repo.find.mockResolvedValue(mockRooms);

      const rooms = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(rooms).toBe(mockRooms);
    });
  });

  describe('update', () => {
    it('should update a room', async () => {
      const mockRoom = new Room();

      repo.findOneBy.mockResolvedValue(mockRoom);
      repo.save.mockResolvedValue(mockRoom);

      const room = await service.update(mockRoom.id, {});

      console.log(mockRoom.id);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: mockRoom.id });
      expect(repo.save).toHaveBeenCalledWith(mockRoom);
      expect(room).toBe(mockRoom);
    });

    it('should throw an error if room is not found', async () => {
      const id = '1';
      const updateRoomInput = {
        /* update room input data */
      };

      repo.findOneOrFail.mockRejectedValue(
        new NotFoundException('Room not found'),
      );

      try {
        await service.update(id, updateRoomInput);
      } catch (error) {
        const err: NotFoundException = error;

        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('Room not found');
      }
    });
  });

  describe('remove', () => {
    it('should remove a room', async () => {
      const id = '1';
      const mockRoom = new Room();

      repo.findOneBy.mockResolvedValue(mockRoom);
      repo.remove.mockResolvedValue(mockRoom);

      const room = await service.remove(id);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: mockRoom.id });
      expect(repo.remove).toHaveBeenCalledWith(mockRoom);
      expect(room).toBe(mockRoom);
    });

    it('should throw an error if room is not found', async () => {
      const id = '1';

      repo.findOneOrFail.mockRejectedValue(
        new NotFoundException('Room not found'),
      );

      try {
        await service.remove(id);
      } catch (error) {
        const err: NotFoundException = error;

        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('Room not found');
      }
    });
  });
});
