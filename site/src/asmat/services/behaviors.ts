import { Address } from '../models/address';
import { Asmat, AsmatInput } from '../models/asmat';
import { AsmatCreationValues, AsmatDetailsValues } from '../models/asmat-form';

export function formatAddress({ city, complement, street, zipCode, zone }: Address) {
  return `${street}${complement ? `, ${complement}` : ''}, ${zipCode} ${city}${zone ? ` (${zone})` : ''}`;
}

export function toAsmatDetailsValues(asmat: Asmat): AsmatDetailsValues {
  return {
    addressStreet: asmat.address.street,
    addressComplement: asmat.address.complement ?? '',
    addressZipCode: asmat.address.zipCode,
    addressCity: asmat.address.city,
    addressZone: asmat.address.zone ?? '',
    email: asmat.email ?? '',
    cellPhoneNumber: asmat.cellPhoneNumber ?? '',
    fixPhoneNumber: asmat.fixPhoneNumber ?? '',
    receptions: asmat.receptions ?? null,
    availabilityCommunicated: !!asmat.availability,
    availabilityBaby: asmat.availability?.baby ?? null,
    availabilityScholar: asmat.availability?.scholar ?? null
  };
}

export function fromAsmatDetailsValues(values: AsmatDetailsValues): Omit<Asmat, '_id' | 'firstName' | 'lastName'> {
  return {
    email: values.email || null,
    cellPhoneNumber: values.cellPhoneNumber || null,
    fixPhoneNumber: values.fixPhoneNumber || null,
    address: {
      street: values.addressStreet,
      complement: values.addressComplement || null,
      zipCode: values.addressZipCode,
      city: values.addressCity,
      zone: values.addressZone || null
    },
    receptions: values.receptions === 0 ? 0 : values.receptions || null,
    availability: !values.availabilityCommunicated ? null : {
      baby: values.availabilityBaby || 0,
      scholar: values.availabilityScholar || 0
    }
  };
}

export function fromAsmatCreationValues(values: AsmatCreationValues): AsmatInput {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email || null,
    cellPhoneNumber: values.cellPhoneNumber || null,
    fixPhoneNumber: values.fixPhoneNumber || null,
    address: {
      street: values.addressStreet,
      complement: values.addressComplement || null,
      zipCode: values.addressZipCode,
      city: values.addressCity,
      zone: values.addressZone || null
    },
    receptions: null,
    availability: null
  };
}
