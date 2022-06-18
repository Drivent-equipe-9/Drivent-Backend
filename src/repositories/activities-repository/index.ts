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

async function findScheduleByDate(date: Date) {
  const schedule = await prisma.activity.findMany({
    where: {
      date,
    },
  });

  return schedule;
}

const activityRepository = {
  findActivitiesDates,
  findScheduleByDate,
};

export default activityRepository;
