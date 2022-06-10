import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import reservationService from '@/services/reservation-service';

export async function findReservation(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const reservation = await reservationService.findReservation(userId);

  res.status(httpStatus.OK).send(reservation);
}
