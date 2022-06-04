/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createOrUpdateTicket, updatePayment } from '@/controllers';
import ticketSchema from '@/schemas/ticket-schema';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(ticketSchema), createOrUpdateTicket)
  .patch('/', updatePayment);

export { ticketRouter };
