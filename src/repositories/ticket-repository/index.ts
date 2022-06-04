import { prisma } from '@/config';
import { TicketData } from '@/services';
import { Ticket } from '@prisma/client';

async function createTicket(ticket: TicketData) {
  return await prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function updateTicket(haveTicket: Ticket, ticket: TicketData) {
  return await prisma.ticket.update({
    where: {
      id: haveTicket?.id,
    },
    data: {
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

async function findPaymentByUserId(userId: number) {
  return await prisma.payment.findFirst({
    where: {
      userId,
    },
  });
}

async function updatePayment(userId: number) {
  await prisma.payment.update({
    where: {
      userId,
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
  updateTicket,
  findByEnrollmentId,
  createPayment,
  updatePayment,
  findPaymentByUserId,
};

export default ticketRepository;
