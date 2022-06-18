import { close } from '@/app';
import { faker } from '@faker-js/faker';
import Joi from 'joi';

afterAll(() => {
  close();
});

describe('ticketSchema', () => {
  const ticketSchema = Joi.object({
    eventId: Joi.number().required(),
    enrollmentId: Joi.number().required(),
    totalPrice: Joi.number().required(),
    isOnline: Joi.boolean().required(),
    withAccommodation: Joi.boolean().required(),
  });

  const generateValidInput = () => ({
    eventId: faker.random.numeric(),
    enrollmentId: faker.random.numeric(),
    isOnline: true,
    withAccommodation: false,
    totalPrice: 100,
  });
  it('should return an error if input is not present', () => {
    const result = ticketSchema.validate(null);

    expect(result.error).toBeDefined();
  });

  describe('event id', () => {
    it('should return error if event id is not present', () => {
      const input = generateValidInput();
      delete input.eventId;

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if event id is not a number', () => {
      const input = generateValidInput();
      input.eventId = faker.lorem.word(1);

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('enrollment id', () => {
    it('should return error if enrollment id is not present', () => {
      const input = generateValidInput();
      delete input.enrollmentId;

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if enrollment id is not a number', () => {
      const input = generateValidInput();
      input.enrollmentId = faker.lorem.word(1);

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('total price', () => {
    it('should return error if total price is not present', () => {
      const input = generateValidInput();
      delete input.totalPrice;

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('is online', () => {
    it('should return error if is online is not present', () => {
      const input = generateValidInput();
      delete input.isOnline;

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('with accommodation', () => {
    it('should return error if with accommodation is not present', () => {
      const input = generateValidInput();
      delete input.withAccommodation;

      const { error } = ticketSchema.validate(input);

      expect(error).toBeDefined();
    });
  });
});
