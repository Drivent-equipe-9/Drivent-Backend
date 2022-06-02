import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';
import { duplicatedTicketError } from './error';

export type TicketData = Omit<Ticket, 'id'>;

export async function postCreateTicket(ticket: TicketData) {
  const haveTicket = await findTicketByEnrollmentId(ticket.enrollmentId);

  if (haveTicket) {
    throw duplicatedTicketError();
  }

  return await ticketRepository.createTicket(ticket);
}

export async function findTicketByEnrollmentId(enrollmentId: number) {
  return await ticketRepository.findByEnrollmentId(enrollmentId);
}

const ticketService = {
  postCreateTicket,
};

export default ticketService;
