import { notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';

export async function findHotel() {
  const hotels = hotelRepository.findHotel();

  if (!hotels) throw notFoundError();

  return hotels;
}

export async function findRoomsByHotelId(hotelId: number) {
  const rooms = hotelRepository.findRoomsByHotelId(hotelId);

  if (!rooms) throw notFoundError();

  return rooms;
}

const hotelService = {
  findHotel,
  findRoomsByHotelId,
};

export default hotelService;
