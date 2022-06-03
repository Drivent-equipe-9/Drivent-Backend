import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';

export type TicketData = Omit<Ticket, 'id'>;

export async function postCreateTicket(ticket: TicketData, userId: number) {
  const haveTicket = await findTicketByEnrollmentId(ticket.enrollmentId);

  const createdTicket = await ticketRepository.createTicket(haveTicket, ticket);
  await ticketRepository.createPayment(userId, createdTicket.id);
}

export async function updatePayment(ticketId: number) {
  await ticketRepository.updatePayment(ticketId);
}

export async function findTicketByEnrollmentId(enrollmentId: number) {
  return await ticketRepository.findByEnrollmentId(enrollmentId);
}

const ticketService = {
  postCreateTicket,
  updatePayment,
};

export default ticketService;
