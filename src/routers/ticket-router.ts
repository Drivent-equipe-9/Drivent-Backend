/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createOrUpdateTicket, findTicketByEnrollmentId } from '@/controllers';
import ticketSchema from '@/schemas/ticket-schema';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .get('/:id', findTicketByEnrollmentId)
  .post('/', validateBody(ticketSchema), createOrUpdateTicket)

export { ticketRouter };
