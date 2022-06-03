/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket } from '@/controllers';
import ticketSchema from '@/schemas/ticket-schema';
import { updatePayment } from '@/services';

const ticketRouter = Router();

ticketRouter
  //.all('/*', authenticateToken)
  .post('/', validateBody(ticketSchema), authenticateToken, createTicket)
  .patch('/', updatePayment);

export { ticketRouter };
