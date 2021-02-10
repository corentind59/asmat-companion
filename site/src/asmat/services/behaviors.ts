import { Address } from '../models/address';

export function formatAddress({ city, complement, street, zipCode, zone }: Address) {
  return `${street}${complement ? `, ${complement}` : ''}, ${zipCode} ${city}${zone ? ` (${zone})` : ''}`;
}
