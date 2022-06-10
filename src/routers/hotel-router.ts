/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findHotel, findRoomsByHotelId, findVacanciesLeftByHotelId } from '@/controllers';

const hotelRouter = Router();

hotelRouter
  .all('/*', authenticateToken)
  .get('/', findHotel)
  .get('/:hotelId/rooms/vacanciesLeft', findVacanciesLeftByHotelId)
  .get('/:hotelId/rooms', findRoomsByHotelId)

export { hotelRouter };