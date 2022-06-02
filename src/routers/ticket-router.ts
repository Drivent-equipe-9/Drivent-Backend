import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket } from '@/controllers';
import ticketSchema from '@/schemas/ticket-schema';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).post('/', validateBody(ticketSchema), createTicket);

export { ticketRouter };
