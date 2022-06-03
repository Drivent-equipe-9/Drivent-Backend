import { Request, Response } from 'express';
import ticketService from '@/services/ticket-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function createOrUpdateTicket(req: AuthenticatedRequest | Request, res: Response) {
  const ticket = req.body;
  const { userId } = res.locals;

  await ticketService.postCreateTicket(ticket, parseInt(userId));

  res.sendStatus(httpStatus.CREATED);
}

export async function updatePayment(req: AuthenticatedRequest | Request, res: Response) {
  const { ticketId } = req.body;

  await ticketService.updatePayment(ticketId);

  res.sendStatus(httpStatus.OK);
}
