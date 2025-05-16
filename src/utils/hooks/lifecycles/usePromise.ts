import {useCallback} from 'react'
import useIsMounted from './useIsMounted'

type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

const usePromise: UsePromise = () => {
  const IsMounted = useIsMounted();
  return useCallback(
    (promise: Promise<any>) =>
      new Promise<any>((resolve, reject) => {
        const onValue = (value: object) => {
          IsMounted() && resolve(value);
        };
        const onError = (error: object) => {
          IsMounted() && reject(error);
        };
        promise.then(onValue, onError);
      }),
    []
  );
};


export default usePromise;
