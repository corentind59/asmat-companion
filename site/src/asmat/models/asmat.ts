import { Availability } from './availability';
import { Address } from './address';

export interface Asmat {
  _id: string;
  firstName: string;
  lastName: string;
  address: Address;
  cellPhoneNumber: string | null;
  fixPhoneNumber: string | null;
  email: string | null;
  receptions: number | null;
  availability: Availability | null;
}

export type AsmatInput = Omit<Asmat, '_id'>;

export type AsmatSummary = Pick<Asmat, '_id'
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'fixPhoneNumber'
  | 'cellPhoneNumber'>;
