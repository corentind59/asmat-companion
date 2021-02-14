import { DateTime } from 'luxon';
import { Adhesion, Asmat } from './model';

export function toAsmatOutput(ret: Asmat) {
  const adhesion = ((): Adhesion | null => {
    if (!ret.lastAdhesionDate) {
      return null;
    }
    const adhesionDate = DateTime.fromJSDate(ret.lastAdhesionDate).toUTC().startOf('day');
    const adhesionEndDate = adhesionDate.plus({ year: 1 });
    const today = DateTime.local().toUTC().startOf('day');
    if (adhesionEndDate <= today) {
      return null;
    }
    const status = today.plus({ month: 1 }) >= adhesionEndDate ? 'remind' : 'normal';
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

export function getNewAdhesionDate(previousAdhesionDate: Date | null) {
  const today = DateTime.local().toUTC().startOf('day');
  if (!previousAdhesionDate) {
    return today.toJSDate();
  }
  const endDate = DateTime.fromJSDate(previousAdhesionDate).toUTC().plus({ year: 1 }).startOf('day');
  if (endDate <= today) {
    return today.toJSDate();
  }
  if (today.plus({ month: 1 }) >= endDate) {
    return endDate.toJSDate();
  }
  const error = new Error("Cannot re-adhere : adhesion still running.");
  error.name = 'AdhesionError';
  throw error;
}
