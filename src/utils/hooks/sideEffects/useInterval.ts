import {useEffect, useRef} from 'react'

/**
 * 使用定时器
 * @param callback
 * @param delay
 */
const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => {
      clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
