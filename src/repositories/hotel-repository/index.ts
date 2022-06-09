import { prisma } from '@/config';

async function findHotel() {
  return await prisma.hotel.findMany({});
}

async function findRoomsByHotelId(hotelId: number) {
  return await prisma.room.findMany({
    where: {
      hotelId,
    },
  });
}

const hotelRepository = {
  findHotel,
  findRoomsByHotelId,
};

export default hotelRepository;
