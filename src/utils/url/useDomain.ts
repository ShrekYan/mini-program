import {useCallback} from "react"

const useDomain = () => {

  const getDomain = useCallback(() => {
    return TARO_APP_DO_MAIN || "http://127.0.0.1:8888/#";
  }, []);

  return {
    getDomain
  }

};

export default useDomain;
