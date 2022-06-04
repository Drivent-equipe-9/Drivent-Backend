import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';

export type TicketData = Ticket;

export async function postCreateTicket(ticket: TicketData, userId: number) {
  const haveTicket: Ticket | null = await findTicketByEnrollmentId(ticket.enrollmentId);

  let createdTicket;

  if (!haveTicket) {
    createdTicket = await ticketRepository.createTicket(ticket);
  } else {
    createdTicket = await ticketRepository.createOrUpdateTicket(haveTicket, ticket);
  }

  await ticketRepository.createPayment(userId, createdTicket.id);

  return createdTicket.id;
}

export async function updatePayment(userId: number) {
  await ticketRepository.updatePayment(userId);
}

export async function findTicketByEnrollmentId(enrollmentId: number) {
  return await ticketRepository.findByEnrollmentId(enrollmentId);
}

const ticketService = {
  postCreateTicket,
  updatePayment,
};

export default ticketService;
