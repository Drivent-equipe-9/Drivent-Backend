import { redis } from '@/app';
import { prisma } from '@/config';

async function findHotel() {
  const cachedHotels = await redis.get('hotels');

  if (!cachedHotels) {
    const hotels = await prisma.hotel.findMany({});

    await redis.set('hotels', JSON.stringify(hotels));

    return hotels;
  }

  return JSON.parse(cachedHotels);
}

async function findRoomsByHotelId(hotelId: number) {
  const cachedRoomsByHotelId = await redis.get(`rooms hotel ${hotelId}`);

  if (!cachedRoomsByHotelId) {
    const roomsByHotelId = await prisma.room.findMany({
      where: {
        hotelId,
      },
    });

    await redis.set(`rooms hotel ${hotelId}`, JSON.stringify(roomsByHotelId));

    return roomsByHotelId;
  }

  return JSON.parse(cachedRoomsByHotelId);
}

async function findVacanciesLeftByHotelId(hotelId: number) {
  const cachedVacanciesLeftByHotelId = await redis.get(`vacancies left hotel ${hotelId}`);

  if (!cachedVacanciesLeftByHotelId) {
    const vacanciesLeft = await prisma.room.aggregate({
      where: {
        hotelId,
      },
      _sum: {
        vacanciesLeft: true,
      },
    });

    await redis.set(`vacancies left hotel ${hotelId}`, JSON.stringify(vacanciesLeft));

    return vacanciesLeft;
  }

  return JSON.parse(cachedVacanciesLeftByHotelId);
}

async function updateNewRoomVacancies(roomId: number) {
  const room = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      vacanciesLeft: {
        decrement: 1,
      },
    },
  });

  if (room.vacanciesLeft === 0) {
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        isVacant: false,
      },
    });
  }

  await redis.del(`vacancies left hotel ${room.hotelId}`);
  await redis.del(`rooms hotel ${room.hotelId}`);
}

async function updateOldRoomVacancies(roomId: number) {
  const room = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      vacanciesLeft: {
        increment: 1,
      },
      isVacant: true,
    },
  });

  await redis.del(`vacancies left hotel ${room.hotelId}`);
  await redis.del(`rooms hotel ${room.hotelId}`);
}

async function findRoom(roomId: number) {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const hotelRepository = {
  findHotel,
  findRoomsByHotelId,
  findVacanciesLeftByHotelId,
  updateNewRoomVacancies,
  updateOldRoomVacancies,
  findRoom,
};

export default hotelRepository;
