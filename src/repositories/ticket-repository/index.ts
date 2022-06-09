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
};

export default ticketRepository;
