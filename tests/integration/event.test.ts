import { close, init, redis } from '@/app';
import { createEvent } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await cleanDb();
  close();
});

describe('GET /event', () => {
  it('should respond with event data if there is an event', async () => {
    const event = await createEvent();

    const response = await redis.get('event-test');

    expect(response).toBe(JSON.stringify(event));
  });
});
