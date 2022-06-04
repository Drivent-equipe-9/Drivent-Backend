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

export async function findTicketByEnrollmentId(req: Request, res: Response) {
  const { id } = req.params;

  const ticket = await ticketService.findTicketByEnrollmentId(parseInt(id));

  res.send(ticket).status(httpStatus.OK);
}

export async function updatePayment(req: Request, res: Response) {
  const { userId } = req.body;

  await ticketService.updatePayment(userId);

  res.sendStatus(httpStatus.OK);
}

export async function findPaymentByUserId(req: Request, res: Response) {
  const { userId } = res.locals;

  const payment = await ticketService.findPaymentByUserId(parseInt(userId));

  res.send(payment).status(httpStatus.OK);
}
