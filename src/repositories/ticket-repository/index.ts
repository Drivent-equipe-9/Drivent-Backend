import { prisma } from '@/config';
import { TicketData } from '@/services';

async function createTicket(ticket: TicketData) {
  await prisma.ticket.create({
    data: ticket,
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
  findByEnrollmentId,
};

export default ticketRepository;
