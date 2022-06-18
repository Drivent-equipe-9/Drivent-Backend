import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { redis } from '@/app';
import { Event } from '@/repositories/event-repository';

export async function createEvent(params: Partial<Event> = {}): Promise<Event> {
  /* return prisma.event.create({
    data: {
      title: params.title || faker.lorem.sentence(),
      backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
      logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
      startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate(),
      endsAt: params.endsAt || dayjs().add(5, 'days').toDate(),
      onlinePrice: 100,
      presentialPrice: 250,
      accommodationPrice: 350,
    },
  }); */
  const driventEvent = {
    id: 1,
    title: params.title || faker.lorem.sentence(),
    logoImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
    backgroundImageUrl: params.logoImageUrl || faker.image.imageUrl(),
    startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate(),
    endsAt: params.endsAt || dayjs().add(5, 'days').toDate(),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
    onlinePrice: 100,
    presentialPrice: 250,
    accommodationPrice: 350,
  };

  await redis.set('event-test', JSON.stringify(driventEvent));
  return driventEvent;
}
