import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotel-service';

export async function findHotel(req: AuthenticatedRequest, res: Response) {
  const hotels = await hotelService.findHotel();

  res.status(httpStatus.OK).send(hotels);
}

export async function findRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  const rooms = await hotelService.findRoomsByHotelId(parseInt(hotelId));

  res.status(httpStatus.OK).send(rooms);
}
