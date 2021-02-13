import { Address } from '../models/address';
import { Asmat } from '../models/asmat';
import { AsmatDetailsValues } from '../models/asmat-form';

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
    receptions: asmat.receptions ?? 0,
    availabilityCommunicated: !!asmat.availability,
    availabilityBaby: asmat.availability?.baby,
    availabilityScholar: asmat.availability?.scholar
  };
}

export function fromAsmatDetailsValues(values: AsmatDetailsValues): Omit<Asmat, '_id' | 'firstName' | 'lastName'> {
  return {
    email: values.email || undefined,
    cellPhoneNumber: values.cellPhoneNumber || undefined,
    fixPhoneNumber: values.fixPhoneNumber || undefined,
    address: {
      street: values.addressStreet,
      complement: values.addressComplement || undefined,
      zipCode: values.addressZipCode,
      city: values.addressCity,
      zone: values.addressZone || undefined
    },
    receptions: values.receptions === 0 ? 0 : values.receptions || undefined,
    availability: !values.availabilityCommunicated ? undefined : {
      baby: values.availabilityBaby!,
      scholar: values.availabilityScholar!
    }
  };
}
