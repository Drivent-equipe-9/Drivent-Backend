import { Hotel, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { redis } from '@/app'

const prisma = new PrismaClient();

type hotelData = Omit<Hotel, 'id'>

async function main() {
  let event = await redis.get('event');
  if (!event) {
    event = {
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
  }

  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    await prisma.hotel.createMany({
      data: [
        {
          name: 'Driven Resort',
          imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
          accomodationType: 'Single e Double',
        },
        {
          name: 'Driven Palace',
          imageUrl: 'https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg',
          accomodationType: 'Single, Double e Triple',
        },
        {
          name: 'Driven World',
          imageUrl: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/29/1013/Grand-Hyatt-Rio-de-Janeiro-P443-Pool.jpg/Grand-Hyatt-Rio-de-Janeiro-P443-Pool.16x9.jpg?imwidth=1920',
          accomodationType: 'Single e Double',
        },
      ],
      skipDuplicates: true,
    })
  }

  let room = await prisma.room.findFirst();
  if (!room) {
    await prisma.room.createMany({
      data: [
        {
          hotelId: 1,
          number: '100',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 1,
          number: '101',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 1,
          number: '102',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 1,
          number: '103',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 1,
          number: '104',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 1,
          number: '105',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 1,
          number: '106',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 1,
          number: '107',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 1,
          number: '108',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 1,
          number: '109',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 1,
          number: '110',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 2,
          number: '100',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 2,
          number: '101',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 2,
          number: '102',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 2,
          number: '103',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 2,
          number: '104',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 2,
          number: '105',
          accomodationType: 'Single',
          vacanciesLeft: 1,
        },
        {
          hotelId: 2,
          number: '106',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 2,
          number: '107',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 2,
          number: '108',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 2,
          number: '109',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 2,
          number: '110',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 2,
          number: '111',
          accomodationType: 'Triple',
          vacanciesLeft: 3,
        },
        {
          hotelId: 2,
          number: '112',
          accomodationType: 'Triple',
          vacanciesLeft: 3,
        },
        {
          hotelId: 2,
          number: '113',
          accomodationType: 'Triple',
          vacanciesLeft: 3,
        },
        {
          hotelId: 2,
          number: '114',
          accomodationType: 'Triple',
          vacanciesLeft: 3,
        },
        {
          hotelId: 2,
          number: '115',
          accomodationType: 'Triple',
          vacanciesLeft: 3,
        },
        {
          hotelId: 3,
          number: '100',
          accomodationType: 'Simple',
          vacanciesLeft: 1,
        },
        {
          hotelId: 3,
          number: '101',
          accomodationType: 'Simple',
          vacanciesLeft: 1,
        },
        {
          hotelId: 3,
          number: '102',
          accomodationType: 'Simple',
          vacanciesLeft: 1,
        },
        {
          hotelId: 3,
          number: '103',
          accomodationType: 'Simple',
          vacanciesLeft: 1,
        },
        {
          hotelId: 3,
          number: '104',
          accomodationType: 'Simple',
          vacanciesLeft: 1,
        },
        {
          hotelId: 3,
          number: '105',
          accomodationType: 'Simple',
          vacanciesLeft: 1,
        },
        {
          hotelId: 3,
          number: '106',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 3,
          number: '107',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 3,
          number: '108',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 3,
          number: '109',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        },
        {
          hotelId: 3,
          number: '110',
          accomodationType: 'Double',
          vacanciesLeft: 2,
        }
      ],
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
