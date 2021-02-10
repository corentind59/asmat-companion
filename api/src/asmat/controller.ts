import AsmatModel from './model';
import { BadRequest, Created, NotFound, Ok } from '@corentind/expressive';

export async function searchAsmats(query: any) {
  if (typeof query !== 'string') {
    throw new BadRequest({
      code: 'invalid-query',
      message: 'Query parameter \'q\' must be specified.'
    });
  }
  console.log(query);
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
  const asmat = await AsmatModel.create(body);
  await asmat.save();
  return new Created(asmat.toJSON());
}
