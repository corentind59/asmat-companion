import { initDataReader } from '../reader';
import { useCallback, useState } from 'react';
import { ApiFunction, DataReader, UpdaterFunction } from '../types';

export default function useAsyncResource<R, P extends any[]>(apiFunction: ApiFunction<R, P>,
                                                             ...parameters: P): [DataReader<R>, UpdaterFunction<P>] {
  const [dataReader, setDataReader] = useState(initDataReader(apiFunction, ...parameters));

  const update: UpdaterFunction<P> = useCallback((...newParameters) => {
    setDataReader(initDataReader(apiFunction, ...newParameters));
  }, [apiFunction]);

  return [dataReader, update];
}
