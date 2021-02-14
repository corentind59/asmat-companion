import { DateTime } from 'luxon';
import { Adhesion, Asmat, AsmatOutput } from './model';

export function toAsmatOutput(ret: Asmat) {
  const adhesion = ((): Adhesion | null => {
    if (!ret.lastAdhesionDate) {
      return null;
    }
    const adhesionDate = DateTime.fromJSDate(ret.lastAdhesionDate).toUTC().startOf('day');
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
  })();

  delete ret._search;
  delete ret.lastAdhesionDate;
  return {
    ...ret,
    adhesion
  };
}

export function getNewAdhesionDate(asmat: AsmatOutput) {
  const today = DateTime.local().toUTC().startOf('day');
  if (!asmat.adhesion) {
    return today.toJSDate();
  }
  if (asmat.adhesion.status === 'expired') {
    return today.toJSDate();
  }
  if (asmat.adhesion.status === 'remind') {
    return DateTime.fromJSDate(asmat.adhesion.joiningDate).toUTC().plus({ year: 1 }).toJSDate();
  }
  const error = new Error('Cannot re-adhere : adhesion still running.');
  error.name = 'AdhesionError';
  throw error;
}
