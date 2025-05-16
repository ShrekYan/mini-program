import {useEffect, useRef} from 'react'


/**
 * 判断组件是否已挂载，如果isMounted为false表示组件已销毁，true表示组件挂载中
 * @return
 */
const useIsMounted = () => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => {
    return isMounted.current;
  };
};

export default useIsMounted;
