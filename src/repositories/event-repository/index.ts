import { redis } from '@/app';
import { prisma } from '@/config';
import dayjs from 'dayjs';

export type Event = {
  id: number;
  title: string;
  backgroundImageUrl: string;
  logoImageUrl: string;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
  onlinePrice: number;
  presentialPrice: number;
  accommodationPrice: number;
};

async function findFirst(): Promise<Event> {
  const cachedEvent = await redis.get('event');

  if (!cachedEvent) {
    const event = {
      id: 1,
      title: 'Driven.t',
      logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, 'days').toDate(),
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
      onlinePrice: 100,
      presentialPrice: 250,
      accommodationPrice: 350,
    };
    await redis.set('event', JSON.stringify(event));

    return event;
  }

  return JSON.parse(cachedEvent);
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
