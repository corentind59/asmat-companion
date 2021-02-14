export type AdhesionStatus = 'normal' | 'remind';

export interface Adhesion {
  joiningDate: string;
  status: AdhesionStatus
}
