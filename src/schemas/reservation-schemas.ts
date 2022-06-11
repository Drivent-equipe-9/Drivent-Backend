import Joi from 'joi';

const reservationSchema = Joi.object({
  roomId: Joi.number().required(),
  hotelId: Joi.number().required(),
});

export default reservationSchema;
