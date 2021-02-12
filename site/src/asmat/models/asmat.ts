import { Availability } from './availability';
import { Address } from './address';

export interface Asmat {
  _id: string;
  firstName: string;
  lastName: string;
  address: Address;
  cellPhoneNumber?: string;
  fixPhoneNumber?: string;
  email?: string;
  receptions?: number;
  availability?: Availability;
}

export type AsmatSummary = Pick<Asmat, '_id'
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'fixPhoneNumber'
  | 'cellPhoneNumber'>;
