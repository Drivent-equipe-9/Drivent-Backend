import faker from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { User } from '@prisma/client';

import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createTicket(enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      eventId: 1,
      enrollmentId,
      isOnline: true,
      withAccommodation: false,
      totalPrice: 100,
    },
  });
}
