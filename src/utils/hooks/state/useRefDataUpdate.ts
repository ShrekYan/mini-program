import {useRef} from 'react'
import useUpdate from '@Hook/basic/sideEffects/useUpdate'

const useRefDataUpdate = <T = any>(data: T) => {
  const update = useUpdate();
  const dataRef = useRef(data);

  const updateDataMethod = (updateData: T) => {
    dataRef.current = updateData;
    //重新更新组件
    update();
  };

  const getRefData = () => {
    return dataRef;
  };

  return [getRefData(), updateDataMethod]
};

export default useRefDataUpdate;
