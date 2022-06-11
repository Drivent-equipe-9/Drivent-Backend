import { conflictError, notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';
import reservationRepository from '@/repositories/reservation-repository';
import { Reservation } from '@prisma/client';

export type ReservationData = Omit<Reservation, 'id' | 'userId'>;

export async function findReservation(userId: number) {
  const reservation = await reservationRepository.findReservation(userId);

  if (!reservation) throw notFoundError();

  return reservation;
}

export async function createOrUpdateReservation(reservation: ReservationData, userId: number) {
  const checkRoom = await hotelRepository.findRoom(reservation.roomId); // procura o novo quarto
  if (checkRoom.isVacant === false) {
    throw conflictError('This room is occupated!'); //verifica se esta disponível
  }

  const alreadyReserved = await reservationRepository.findReservation(userId); //verifica se existe reserva
  if (alreadyReserved) {
    // se exitsir

    await hotelRepository.updateOldRoomVacancies(alreadyReserved.roomId); //aumenta o numero de vagas do quarto antigo
    await hotelRepository.updateNewRoomVacancies(reservation.roomId); //diminui no numero de vagas do novo quarto
    await reservationRepository.updateReservation(reservation, userId, alreadyReserved); //atualiza a nova reserva com novo hotelId roomId
  } else {
    // se não existir

    await hotelRepository.updateNewRoomVacancies(reservation.roomId); //dimuniu o numero de vagas do quarto
    await reservationRepository.createReservation(reservation, userId); //cria nova reserva
  }
}

const reservationService = {
  findReservation,
  createOrUpdateReservation,
};

export default reservationService;
