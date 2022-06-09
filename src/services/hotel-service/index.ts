import { notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';

export async function findHotel() {
  const hotels = hotelRepository.findHotel();

  if (!hotels) throw notFoundError();

  return hotels;
}

const hotelService = {
  findHotel,
};

export default hotelService;
