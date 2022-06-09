import { prisma } from '@/config';

async function findHotel() {
  return await prisma.hotel.findMany({});
}

const hotelRepository = {
  findHotel,
};

export default hotelRepository;
