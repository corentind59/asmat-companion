import { ApiFunction, DataReader, FetchStatus } from './types';

export function initDataReader<R, P extends any[] = []>(apiFunction: ApiFunction<R, P>,
                                                        ...parameters: P): DataReader<R> {
  let data: R;
  let status: FetchStatus = 'init';
  let error: Error;

  const fetchingData = apiFunction(...parameters)
    .then(fetchedData => {
      data = fetchedData;
      status = 'done';
    })
    .catch((e: unknown) => {
      if (!(e instanceof Error)) {
        throw e;
      }
      error = e;
      status = 'error';
    });

  return {
    read() {
      if (status === 'init') {
        throw fetchingData;
      } else if (status === 'error') {
        throw error;
      }
      return data;
    }
  };
}
