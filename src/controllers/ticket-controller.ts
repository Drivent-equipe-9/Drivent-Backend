import { Request, Response } from 'express';
import ticketService from '@/services/ticket-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function createTicket(req: AuthenticatedRequest | Request, res: Response) {
  const ticket = req.body;
  const { userId } = res.locals;
  res.locals.ticketId = ticket.id;

  await ticketService.postCreateTicket(ticket, parseInt(userId));

  res.sendStatus(httpStatus.CREATED);
}

export async function updatePayment(req: AuthenticatedRequest | Request, res: Response) {
  const { ticketId } = res.locals;

  await ticketService.updatePayment(ticketId);

  res.sendStatus(httpStatus.OK);
}
