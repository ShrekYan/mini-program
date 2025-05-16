import {useEffect, EffectCallback} from 'react'

/**
 * 执行一次Effect
 * @param effect
 */
const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

export default useEffectOnce;
