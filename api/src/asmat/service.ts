import { DateTime } from 'luxon';
import AsmatModel, { Adhesion, Asmat, AsmatDocument, AsmatOutput } from './model';
import { NotFound } from '@corentind/expressive';

export function toAsmatOutput(ret: Asmat): AsmatOutput {
  const adhesion = toAdhesion(ret.lastAdhesionDate ?? null);
  delete ret._search;
  delete ret.lastAdhesionDate;
  return {
    ...ret,
    adhesion
  };
}

export function toAdhesion(lastAdhesionDate: AsmatDocument['lastAdhesionDate']): Adhesion | null {
  if (!lastAdhesionDate) {
    return null;
  }
  const adhesionDate = DateTime.fromJSDate(lastAdhesionDate).toUTC().startOf('day');
  const adhesionEndDate = adhesionDate.plus({ year: 1 });
  const today = DateTime.local().toUTC().startOf('day');
  const status = adhesionEndDate <= today ?
    'expired' :
    today.plus({ month: 1 }) >= adhesionEndDate ?
      'remind' :
      'normal';
  return {
    joiningDate: adhesionDate.toJSDate(),
    status: status
  };
}

export function getNewAdhesionDate(lastAdhesionDate: AsmatDocument['lastAdhesionDate']) {
  const today = DateTime.local().toUTC().startOf('day');
  const adhesion = toAdhesion(lastAdhesionDate);
  if (!adhesion) {
    return today.toJSDate();
  }
  if (adhesion.status === 'expired') {
    return today.toJSDate();
  }
  if (adhesion.status === 'remind') {
    return DateTime.fromJSDate(adhesion.joiningDate).toUTC().plus({ year: 1 }).toJSDate();
  }
  const error = new Error('Cannot re-adhere : adhesion still running.');
  error.name = 'AdhesionError';
  throw error;
}

export async function findByIdOrThrow(id: string) {
  const originalAsmat = await AsmatModel.findById(id);
  if (!originalAsmat) {
    throw new NotFound({
      code: 'asmat-not-found'
    });
  }
  return originalAsmat;
}
