import { http } from '@/lib/axios';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

type CancellablePromise<T> = Promise<T> & { cancel: () => void };

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): CancellablePromise<T> => {
  const source = Axios.CancelToken.source();
  const promise = http({
    ...config,
    ...options,
    responseType: 'json',
    cancelToken: source.token,
  }).then(({ data }) => data) as CancellablePromise<T>;

  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;