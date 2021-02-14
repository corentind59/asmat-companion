import { Availability } from './availability';
import { Address } from './address';
import { Adhesion } from './adhesion';

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
  adhesion: Adhesion | null;
}

export type AsmatCreationInput = Omit<Asmat, '_id'
  | 'adhesion'>;

export type AsmatUpdateInput = Omit<Asmat, '_id'
  | 'firstName'
  | 'lastName'
  | 'adhesion'>

export type AsmatSummary = Pick<Asmat, '_id'
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'fixPhoneNumber'
  | 'cellPhoneNumber'>;
