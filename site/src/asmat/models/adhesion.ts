export type AdhesionStatus = 'normal' | 'remind' | 'expired';

export interface Adhesion {
  joiningDate: string;
  status: AdhesionStatus
}
