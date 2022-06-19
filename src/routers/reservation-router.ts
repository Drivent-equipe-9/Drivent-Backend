/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { findReservation, createOrUpdateReservation } from '@/controllers';
import reservationSchema from '@/schemas/reservation-schemas';

const reservationRouter = Router();

reservationRouter
  .all('/*', authenticateToken)
  .get('/', findReservation)
  .post('/', validateBody(reservationSchema), createOrUpdateReservation)

export { reservationRouter };
