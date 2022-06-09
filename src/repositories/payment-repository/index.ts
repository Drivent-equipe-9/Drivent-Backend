import { prisma } from '@/config';

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

const paymentRepository = {
  createPayment,
  updatePayment,
  findPaymentByUserId,
};

export default paymentRepository;
