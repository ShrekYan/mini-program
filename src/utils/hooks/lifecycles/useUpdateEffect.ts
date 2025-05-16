import {useEffect} from 'react'
import useFirstMountState from '../state/useFirstMountState'

type Callback = () => any | void;

const useUpdateEffect = (effect: Callback, deps: any[]) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
