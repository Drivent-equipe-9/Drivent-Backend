import { prisma } from '@/config';
import { ReservationData } from '@/services';
import { Reservation } from '@prisma/client';

async function findReservation(userId: number) {
  return await prisma.reservation.findFirst({
    where: {
      userId,
    },
    include: {
      Hotel: true,
      Room: true,
    },
  });
}

async function createReservation(reservation: ReservationData, userId: number) {
  return await prisma.reservation.create({
    data: {
      userId,
      roomId: reservation.roomId,
      hotelId: reservation.hotelId,
    },
  });
}

async function updateReservation(reservation: ReservationData, userId: number, alreadyReserved: Reservation) {
  return await prisma.reservation.update({
    where: {
      id: alreadyReserved.id,
    },
    data: {
      userId,
      roomId: reservation.roomId,
      hotelId: reservation.hotelId,
    },
  });
}

const reservationRepository = {
  findReservation,
  updateReservation,
  createReservation,
};

export default reservationRepository;
