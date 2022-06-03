import { prisma } from '@/config';
import { TicketData } from '@/services';
import { Ticket } from '@prisma/client';

async function createTicket(haveTicket: Ticket, ticket: TicketData) {
  return await prisma.ticket.upsert({
    where: {
      id: haveTicket.id,
    },
    update: {
      ...ticket,
    },
    create: {
      ...ticket,
    },
  });
}

async function createPayment(userId: number, ticketId: number) {
  await prisma.payment.upsert({
    where: {
      userId,
    },
    update: {
      userId,
      ticketId,
    },
    create: {
      userId,
      ticketId,
    },
  });
}

async function updatePayment(ticketId: number) {
  await prisma.payment.update({
    where: {
      ticketId,
    },
    data: {
      isPaid: true,
    },
  });
}

async function findByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

const ticketRepository = {
  createTicket,
  createPayment,
  updatePayment,
  findByEnrollmentId,
};

export default ticketRepository;
