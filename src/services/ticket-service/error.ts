import { ApplicationError } from '@/protocols';

export function duplicatedTicketError(): ApplicationError {
  return {
    name: 'DuplicatedTicketError',
    message: 'There is already an ticket with given user id',
  };
}
