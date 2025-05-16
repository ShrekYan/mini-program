import {useEffect, EffectCallback} from 'react'

const useLifecycles = (mount: EffectCallback, unmount: EffectCallback) => {
  useEffect(() => {
    if (mount) {
      mount();
    }
    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []);
};

export default useLifecycles;
