import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotel-service';

export async function findHotel(req: AuthenticatedRequest, res: Response) {
  const hotels = await hotelService.findHotel();

  res.status(httpStatus.CREATED).send(hotels);
}
