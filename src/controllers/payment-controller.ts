import { Request, Response } from 'express';
import paymentService from '@/services/payment-service';
import httpStatus from 'http-status';

export async function updatePayment(req: Request, res: Response) {
  const { userId } = req.body;

  await paymentService.updatePayment(userId);

  res.sendStatus(httpStatus.OK);
}

export async function findPaymentByUserId(req: Request, res: Response) {
  const { userId } = res.locals;

  const payment = await paymentService.findPaymentByUserId(parseInt(userId));

  res.send(payment).status(httpStatus.OK);
}
