export interface AsmatCreationValues extends Pick<AsmatDetailsValues, 'addressStreet'
  | 'addressComplement'
  | 'addressZipCode'
  | 'addressCity'
  | 'addressZone'
  | 'email'
  | 'cellPhoneNumber'
  | 'fixPhoneNumber'> {
  firstName: string;
  lastName: string;
}

export interface AsmatDetailsValues {
  addressStreet: string;
  addressComplement: string;
  addressZipCode: string;
  addressCity: string;
  addressZone: string;
  email: string;
  cellPhoneNumber: string | null;
  fixPhoneNumber: string | null;
  receptions: number | null;
  availabilityCommunicated: boolean;
  availabilityBaby: number | null;
  availabilityScholar: number | null;
}
