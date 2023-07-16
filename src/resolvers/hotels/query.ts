import { GraphQLError } from 'graphql';

import { Queries } from './types';

export const HotelQueries: Queries = {
  async hotel(parent, { id }, { prisma }) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });

    if (!hotel) {
      throw new GraphQLError('Hotel inválido');
    }

    return hotel;
  },

  async hotels(parent, args, { prisma }) {
    const hotels = await prisma.hotel.findMany();

    return hotels;
  },

  async hotelBySlug(parent, { slug }, { prisma }) {
    const hotel = await prisma.hotel.findFirst({
      where: {
        slug,
      },
      include: {
        room: true,
      },
    });

    if (!hotel) {
      throw new GraphQLError('Hotel inválido');
    }

    return hotel;
  },

  async hotelsByAdmin(parent, args, { prisma, user }) {
    const hotel = await prisma.hotel.findMany({
      where: {
        admin: {
          id: user.id,
        },
      },
    });

    return hotel;
  },
};