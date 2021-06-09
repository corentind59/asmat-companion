import AsmatModel from './model';
import { BadRequest, Created, NotFound, Ok } from '@corentind/expressive';
import { findByIdOrThrow, getNewAdhesionDate, toAdhesion } from './service';
import { DateTime } from 'luxon';

type GetAsmatsQueryParams = {
  city?: string,
  zone?: string,
  adhesionEndDateBefore?: string;
};

export async function getAsmats({ city, zone, adhesionEndDateBefore }: GetAsmatsQueryParams) {
  const zones = zone?.split(',');
  const filter = {
    ...(city && { 'address.city': city }),
    ...(zones && { 'address.zone': { $in: zones } }),
    ...(adhesionEndDateBefore && {
      lastAdhesionDate: {
        $ne: null,
        $lt: DateTime.fromISO(adhesionEndDateBefore).minus({ year: 1 }).toJSDate()
      }
    })
  };
  const asmats = await AsmatModel.find(filter);
  const jsonAsmats = asmats.map(doc => doc.toJSON());
  return new Ok(jsonAsmats);
}

export async function searchAsmats(query: any) {
  if (typeof query !== 'string') {
    throw new BadRequest({
      code: 'invalid-query',
      message: 'Query parameter \'q\' must be specified.'
    });
  }
  const asmats = await AsmatModel.searchAsmatsByQuery(query);
  return new Ok(asmats);
}

export async function getById(id: string) {
  const asmat = await AsmatModel.findById(id).exec();
  if (!asmat) {
    throw new NotFound({
      code: 'asmat-not-found'
    });
  }
  return new Ok(asmat);
}

export async function createAsmat(body: any) {
  const asmat = await AsmatModel.create({
    ...body,
    lastAdhesionDate: null
  });
  await asmat.save();
  return new Created(asmat.toJSON());
}

export async function updateAsmatById(id: string, body: any) {
  const originalAsmat = await findByIdOrThrow(id);
  originalAsmat.set({
    ...body,
    _id: id,
    lastAdhesionDate: originalAsmat.lastAdhesionDate
  });
  const updatedAsmat = await originalAsmat.save();
  return new Ok(updatedAsmat.toJSON());
}

export async function adhere(id: string) {
  const asmat = await findByIdOrThrow(id);
  try {
    const nextAdhesionDate = getNewAdhesionDate(asmat.lastAdhesionDate);
    asmat.set({ lastAdhesionDate: nextAdhesionDate });
    const updatedAsmat = await asmat.save();
    return new Ok(updatedAsmat.toJSON());
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AdhesionError') {
      throw new BadRequest({
        code: 'adhesion-error',
        message: e.message
      });
    }
    throw e;
  }
}

export async function unsubscribe(id: string) {
  const asmat = await findByIdOrThrow(id);
  if (toAdhesion(asmat.lastAdhesionDate)?.status !== 'expired' ?? true) {
    throw new BadRequest({
      code: 'unsubscription-error',
      message: 'Asmat adhesion has not expired yet.'
    });
  }
  asmat.set({ lastAdhesionDate: null });
  const updatedAsmat = await asmat.save();
  return new Ok(updatedAsmat.toJSON());
}
