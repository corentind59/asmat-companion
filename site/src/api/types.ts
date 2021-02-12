export type ApiFunction<R, P extends any[]> = (...parameters: P) => Promise<R>;
export type UpdaterFunction<P extends any[]> = (...parameters: P) => void;
export type DataReader<R> = {
  read(): R
}
export type LazyDataReader<R> = {
  read(): R | undefined
}
export type FetchStatus = 'init' | 'done' | 'error';
