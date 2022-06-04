import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';

export type TicketData = Ticket;

export async function postCreateTicket(ticket: TicketData, userId: number) {
  const { isPaid } = await ticketRepository.findPaymentByUserId(userId);
  const haveTicket: Ticket | null = await findTicketByEnrollmentId(ticket.enrollmentId);

  let createdTicket;

  if (!haveTicket) {
    createdTicket = await ticketRepository.createTicket(ticket);
    await ticketRepository.createPayment(userId, createdTicket.id);
  } else if (haveTicket && !isPaid) {
    createdTicket = await ticketRepository.updateTicket(haveTicket, ticket);
  }
  return;
}

export async function updatePayment(userId: number) {
  await ticketRepository.updatePayment(userId);
}

export async function findTicketByEnrollmentId(enrollmentId: number) {
  return await ticketRepository.findByEnrollmentId(enrollmentId);
}

export async function findPaymentByUserId(userId: number) {
  return await ticketRepository.findPaymentByUserId(userId);
}

const ticketService = {
  postCreateTicket,
  updatePayment,
  findPaymentByUserId,
  findTicketByEnrollmentId,
};

export default ticketService;
