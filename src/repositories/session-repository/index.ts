import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function findByUserId(userId: number) {
  const session = await prisma.session.findFirst({
    where: {
      userId,
    },
  });

  return session.token;
}

const sessionRepository = {
  create,
  findByUserId,
};

export default sessionRepository;
