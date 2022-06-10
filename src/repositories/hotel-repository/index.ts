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

async function findVacanciesLeftByHotelId(hotelId: number) {
  return await prisma.room.aggregate({
    where: {
      hotelId,
    },
    _sum: {
      vacanciesLeft: true,
    },
  });
}

const hotelRepository = {
  findHotel,
  findRoomsByHotelId,
  findVacanciesLeftByHotelId,
};

export default hotelRepository;
