/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findHotel } from '@/controllers';

const hotelRouter = Router();

hotelRouter
  .all('/*', authenticateToken)
  .get('/', findHotel)

export { hotelRouter };