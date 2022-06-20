import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivitiesDates, getScheduleByDate, register } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken);
activitiesRouter.get('/dates', getActivitiesDates);
activitiesRouter.get('/:date/schedule', getScheduleByDate);
activitiesRouter.post('/:activityId', register);

export { activitiesRouter };
