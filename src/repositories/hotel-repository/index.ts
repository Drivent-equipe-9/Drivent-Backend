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
}

async function updateOldRoomVacancies(roomId: number) {
  await prisma.room.update({
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
