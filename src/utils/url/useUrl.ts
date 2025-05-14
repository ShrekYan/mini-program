import {useCallback} from "react"

const useUrl = () => {
  /**
   * 获取图片资源
   */
  const getImagePath = useCallback((localPath: string) => {
    if (ENV_MODAL === "development") {
      return require(`@assets/images${localPath}`);
    }
    return `https://dev-static.qiangungun.com/img/frodo/images${localPath}`;
  }, []);

  return {
    getImagePath
  }
};

export default useUrl;
