import app, { close, init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import { createEnrollmentWithAddress, createEvent, createTicket, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(() => {
  close();
});

const server = supertest(app);

describe('GET /ticket/:id', () => {
  it('should respond with status 401 if not given enrollment id', async () => {
    const response = await server.get(`/ticket`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if no token is given', async () => {
    const enrollment = await createEnrollmentWithAddress();

    const response = await server.get(`/ticket/${enrollment.id}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const enrollment = await createEnrollmentWithAddress();
    const token = faker.lorem.word();

    const response = await server.get(`/ticket/${enrollment.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const enrollment = await createEnrollmentWithAddress();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/ticket/${enrollment.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and an empty object if there is no ticket for given enrollment id', async () => {
      const token = await generateValidToken();
      const randomId = Math.floor(Math.random() * 101);

      const response = await server.get(`/ticket/${randomId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({});
    });

    it('should respond with status 200 and ticket data when there is a ticket for given enrollmentId', async () => {
      const user = await createUser();
      const event = await createEvent();
      const enrollment = await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);
      const ticket = await createTicket(enrollment.id, event.id);

      const response = await server.get(`/ticket/${enrollment.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(ticket);
    });
  });
});

describe('POST /ticket', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/ticket');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/ticket').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/ticket').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 400 when body is not present', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.post('/ticket').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const body = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/ticket').set('Authorization', `Bearer ${token}`).send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    it('should respond with status 201 and create a ticket if there is not any', async () => {
      const user = await createUser();
      const event = await createEvent();
      const enrollment = await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);
      const generateValidBody = () => ({
        eventId: event.id,
        enrollmentId: enrollment.id,
        isOnline: true,
        withAccommodation: false,
        totalPrice: 100,
      });
      const body = generateValidBody();

      const response = await server.post('/ticket').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      const ticket = await prisma.ticket.findFirst({ where: { enrollmentId: enrollment.id } });
      expect(ticket).toBeDefined();
    });
  });
});
