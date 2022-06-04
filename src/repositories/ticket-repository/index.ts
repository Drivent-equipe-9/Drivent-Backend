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

async function createOrUpdateTicket(haveTicket: Ticket, ticket: TicketData) {
  return await prisma.ticket.upsert({
    where: {
      id: haveTicket?.id,
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

// async function updatePayment(userId: number) {
//   await prisma.$executeRawUnsafe(
//     `
//       UPDATE
//         "Payment"
//       SET
//         "isPaid" = true
//       WHERE
//         "userId" = $1
//     `,
//     userId,
//   );
// }

async function findByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

const ticketRepository = {
  createTicket,
  createOrUpdateTicket,
  findByEnrollmentId,
  createPayment,
  updatePayment,
};

export default ticketRepository;
