import { prisma } from '@/config';

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

const reservationRepository = {
  findReservation,
};

export default reservationRepository;
