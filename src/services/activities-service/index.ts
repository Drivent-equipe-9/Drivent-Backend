import activityRepository from '@/repositories/activities-repository';
import { dateFormat } from '@/utils/dateFormat';

export async function getActivitiesDates() {
  const activities = await activityRepository.findActivitiesDates();
  const formatedActivitiesDates = dateFormat(activities);

  return formatedActivitiesDates;
}

export async function getScheduleByDate(date: Date) {
  const schedule = await activityRepository.findScheduleByDate(date);

  return schedule;
}

const activityService = {
  getActivitiesDates,
  getScheduleByDate,
};

export default activityService;
