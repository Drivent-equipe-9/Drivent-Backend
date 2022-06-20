import { prisma } from '@/config';

async function findActivitiesDates() {
  const activities = await prisma.activity.groupBy({
    by: ['date'],
    orderBy: {
      date: 'asc',
    },
  });

  return activities;
}

async function findScheduleByDate(date: Date, userId: number) {
  const schedule = await prisma.activity.findMany({
    where: {
      date,
    },
    include: {
      ActivityUser: {
        where: {
          userId,
        },
      },
    },
  });

  return schedule;
}

async function register(userId: number, activityId: number) {
  await prisma.$transaction([
    prisma.activityUser.create({
      data: {
        userId,
        activityId,
      },
    }),
    prisma.activity.update({
      where: {
        id: activityId,
      },
      data: {
        vacancies: {
          decrement: 1,
        },
      },
    }),
  ]);
}

const activityRepository = {
  findActivitiesDates,
  findScheduleByDate,
  register,
};

export default activityRepository;
