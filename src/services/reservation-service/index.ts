import { notFoundError } from '@/errors';
import reservationRepository from '@/repositories/reservation-repository';

export async function findReservation(userId: number) {
  const reservation = await reservationRepository.findReservation(userId);

  if (!reservation) throw notFoundError();

  return reservation;
}

const reservationService = {
  findReservation,
};

export default reservationService;
