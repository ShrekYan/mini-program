import {useEffect, DependencyList} from 'react'
import useAsyncFn from './useAsyncFn'

type FunctionReturningPromise = (...args: any[]) => Promise<any>;

const useAsync = <T extends FunctionReturningPromise>(fn: T, deps: DependencyList[]) => {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });
  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
