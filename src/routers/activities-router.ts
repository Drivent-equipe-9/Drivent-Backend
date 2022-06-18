import { Router } from 'express';
import { getActivitiesDates, getScheduleByDate } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.get('/dates', getActivitiesDates);
activitiesRouter.get('/:date/schedule', getScheduleByDate);

export { activitiesRouter };
