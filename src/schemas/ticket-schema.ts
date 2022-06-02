import Joi from 'joi';

const ticketSchema = Joi.object({
  eventId: Joi.number().required(),
  enrollmentId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  isOnline: Joi.boolean().required(),
  withAccommodation: Joi.boolean().required(),
});

export default ticketSchema;
