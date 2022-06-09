import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import { createEnrollmentWithAddress, createUser } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('/ticket/:id', () => {
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
    it.todo('should respond with status 404 if there is no ticket for given user');
    it.todo('should respond with status 200 and ticket data when there is a ticket for given user');
  });
  /* it.todo(); */
});
