import {Dispatch, SetStateAction, useRef, useState, useCallback} from 'react'
import useUnmount from '@Hook/basic/lifecycles/useUnmount'

const useRafState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef<number>(0);
  const [state, setState] = useState<S>(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(frame.current);
  });

  return [state, setRafState];
};

export default useRafState;
