import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  const hotel = await prisma.hotel.findFirst();
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
          imageUrl:
            'https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg',
          accomodationType: 'Single, Double e Triple',
        },
        {
          name: 'Driven World',
          imageUrl:
            'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/29/1013/Grand-Hyatt-Rio-de-Janeiro-P443-Pool.jpg/Grand-Hyatt-Rio-de-Janeiro-P443-Pool.16x9.jpg?imwidth=1920',
          accomodationType: 'Single e Double',
        },
      ],
      skipDuplicates: true,
    });
  }

  console.log({ hotel });

  const room = await prisma.room.findFirst();
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
        },
      ],
    });
  }

  console.log({ room });

  const activity = await prisma.activity.findFirst();
  if (!activity) {
    await prisma.activity.createMany({
      data: [
        {
          eventId: 1,
          date: dayjs().add(3, 'days').toDate(),
          location: 'Auditório Principal',
          name: 'Oficina lolzinho',
          startsAt: '09',
          endsAt: '10',
          vacancies: 0,
        },
        {
          eventId: 1,
          date: dayjs().add(3, 'days').toDate(),
          location: 'Auditório Lateral',
          name: 'Oficina batata',
          startsAt: '09',
          endsAt: '11',
          vacancies: 10,
        },
        {
          eventId: 1,
          date: dayjs().add(3, 'days').toDate(),
          location: 'Sala de Workshop',
          name: 'Oficina cansei',
          startsAt: '09',
          endsAt: '11',
          vacancies: 10,
        },
        {
          eventId: 1,
          date: dayjs().add(4, 'days').toDate(),
          location: 'Auditório Principal',
          name: 'Oficina lolzinho',
          startsAt: '10',
          endsAt: '11',
          vacancies: 0,
        },
        {
          eventId: 1,
          date: dayjs().add(4, 'days').toDate(),
          location: 'Auditório Lateral',
          name: 'Oficina batata',
          startsAt: '09',
          endsAt: '11',
          vacancies: 10,
        },
        {
          eventId: 1,
          date: dayjs().add(4, 'days').toDate(),
          location: 'Auditório Lateral',
          name: 'Oficina neosoro',
          startsAt: '11',
          endsAt: '12',
          vacancies: 10,
        },
        {
          eventId: 1,
          date: dayjs().add(4, 'days').toDate(),
          location: 'Auditório Lateral',
          name: 'Oficina berinjela',
          startsAt: '14',
          endsAt: '16',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(4, 'days').toDate(),
          location: 'Auditório Principal',
          name: 'Oficina berinjela',
          startsAt: '12',
          endsAt: '14',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(5, 'days').toDate(),
          location: 'Auditório Principal',
          name: 'Oficina de comida',
          startsAt: '09',
          endsAt: '10',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(5, 'days').toDate(),
          location: 'Auditório Principal',
          name: 'Almoço',
          startsAt: '11',
          endsAt: '13',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(5, 'days').toDate(),
          location: 'Auditório Lateral',
          name: 'Oficina Forza',
          startsAt: '09',
          endsAt: '10',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(5, 'days').toDate(),
          location: 'Auditório Lateral',
          name: 'Oficina Minecraft',
          startsAt: '10',
          endsAt: '12',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(5, 'days').toDate(),
          location: 'Sala de Workshop',
          name: 'Workshop Montando seu PC',
          startsAt: '10',
          endsAt: '12',
          vacancies: 16,
        },
        {
          eventId: 1,
          date: dayjs().add(5, 'days').toDate(),
          location: 'Sala de Workshop',
          name: 'Workshop Codando seu Próprio Jogo',
          startsAt: '13',
          endsAt: '15',
          vacancies: 16,
        },
      ],
    });
  }

  console.log({ activity });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
