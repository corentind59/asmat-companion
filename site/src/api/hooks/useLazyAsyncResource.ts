import { initDataReader } from '../reader';
import { useCallback, useState } from 'react';
import { ApiFunction, LazyDataReader, UpdaterFunction } from '../types';

export default function useLazyAsyncResource<R, P extends any[]>(apiFunction: ApiFunction<R, P>)
  : [LazyDataReader<R>, UpdaterFunction<P>] {
  const [dataReader, setDataReader] = useState<LazyDataReader<R>>(() => ({
    read: () => undefined
  }));

  const update: UpdaterFunction<P> = useCallback((...parameters) => {
    setDataReader(initDataReader(apiFunction, ...parameters));
  }, [apiFunction]);

  return [dataReader, update];
}
