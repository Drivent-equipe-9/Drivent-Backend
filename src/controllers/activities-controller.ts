import activityService from '@/services/activities-service';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivitiesDates(_req: Request, res: Response) {
  const dates = await activityService.getActivitiesDates();

  return res.status(httpStatus.OK).send(dates);
}

export async function getScheduleByDate(req: Request, res: Response) {
  const date = req.params.date;
  const { userId } = res.locals;

  const newDate = dayjs(date).toDate();

  const schedule = await activityService.getScheduleByDate(newDate, userId);

  return res.status(httpStatus.OK).send(schedule);
}

export async function register(req: Request, res: Response) {
  const { userId } = res.locals;
  const { activityId } = req.params;

  await activityService.register(userId, +activityId);

  return res.sendStatus(httpStatus.CREATED);
}
