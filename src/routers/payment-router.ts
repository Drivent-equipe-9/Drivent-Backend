/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findPaymentByUserId, updatePayment } from '@/controllers';

const paymentRouter = Router();

paymentRouter
    .all('/*', authenticateToken)
    .get('/', findPaymentByUserId)
    .patch('/', updatePayment)

export { paymentRouter };
