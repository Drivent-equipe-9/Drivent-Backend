/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findHotel, findRoomsByHotelId } from '@/controllers';

const hotelRouter = Router();

hotelRouter
  .all('/*', authenticateToken)
  .get('/', findHotel)
  .get('/:hotelId/rooms', findRoomsByHotelId)

export { hotelRouter };