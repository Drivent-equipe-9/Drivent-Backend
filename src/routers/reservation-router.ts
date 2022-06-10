/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findReservation } from '@/controllers';

const reservationRouter = Router();

reservationRouter
  .all('/*', authenticateToken)
  .get('/', findReservation)

export { reservationRouter };
