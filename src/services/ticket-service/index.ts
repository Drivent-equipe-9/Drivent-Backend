import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';

export type TicketData = Ticket;

export async function postCreateTicket(ticket: TicketData, userId: number) {
  const payment = await paymentRepository.findPaymentByUserId(userId);
  const haveTicket: Ticket | null = await findTicketByEnrollmentId(ticket.enrollmentId);

  let createdTicket;

  if (!haveTicket) {
    createdTicket = await ticketRepository.createTicket(ticket);
    await paymentRepository.createPayment(userId, createdTicket.id);
  } else if (haveTicket && !payment.isPaid) {
    createdTicket = await ticketRepository.updateTicket(haveTicket, ticket);
  }
  return;
}

export async function findTicketByEnrollmentId(enrollmentId: number) {
  return await ticketRepository.findByEnrollmentId(enrollmentId);
}

const ticketService = {
  postCreateTicket,
  findTicketByEnrollmentId,
};

export default ticketService;
