import activityRepository from '@/repositories/activities-repository';
import { dateFormat } from '@/utils/dateFormat';

export async function getActivitiesDates() {
  const activities = await activityRepository.findActivitiesDates();
  const formatedActivitiesDates = dateFormat(activities);

  return formatedActivitiesDates;
}

export async function getScheduleByDate(date: Date, userId: number) {
  const schedule = await activityRepository.findScheduleByDate(date, userId);

  return schedule;
}

export async function register(userId: number, activityId: number) {
  return await activityRepository.register(userId, activityId);
}

const activityService = {
  getActivitiesDates,
  getScheduleByDate,
  register,
};

export default activityService;
