import { Request, Response } from 'express';
import ticketService from '@/services/ticket-service';
import httpStatus from 'http-status';

export async function createTicket(req: Request, res: Response) {
  const ticket = req.body;
  await ticketService.postCreateTicket(ticket);

  res.sendStatus(httpStatus.CREATED);
}
