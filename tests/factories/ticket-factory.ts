import { prisma } from '@/config';

export async function createTicket(enrollmentId: number, eventId: number) {
  return prisma.ticket.create({
    data: {
      eventId,
      enrollmentId,
      isOnline: true,
      withAccommodation: false,
      totalPrice: 100,
    },
  });
}
