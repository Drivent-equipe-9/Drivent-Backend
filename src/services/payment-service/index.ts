import paymentRepository from '@/repositories/payment-repository';

export async function findPaymentByUserId(userId: number) {
  return await paymentRepository.findPaymentByUserId(userId);
}

export async function updatePayment(userId: number) {
  await paymentRepository.updatePayment(userId);
}

const paymentService = {
  updatePayment,
  findPaymentByUserId,
};

export default paymentService;
