import {useRef} from "react"
import useUnmount from "@utils/hooks/lifecycles/useUnmount"
import usePage from "@utils/router/usePage"

//共享store Map
const shareStoreMap: Record<string, any> = {};

/**
 * 生成共享store
 * @param customName 自定义名称
 * @param leavePageClear 离开自动清除Store，true清除，false不清除
 */
const useShareStore = ({customName, leavePageClear} = {customName: "", leavePageClear: false}) => {

  const page = usePage();

  const currentPage = useRef<string>(page.getCurrentPagePath() as string);

  let storeCacheKey: string;

  if (customName) {
    storeCacheKey = `${currentPage.current}/:${customName}`;
  } else {
    storeCacheKey = currentPage.current;
  }

  /**
   * 保存Store
   * @param store
   * @return {*}
   */
  const saveStore = <TStore = any>(store: TStore): TStore => {
    let currentStore = shareStoreMap[storeCacheKey];
    if (!currentStore) {
      currentStore = shareStoreMap[storeCacheKey] = store;
    }
    return currentStore;
  };

  /**
   * 删除Store
   * @param cacheKey
   */
  const deleteStore = (cacheKey?: string) => {
    let needDeleteKey = cacheKey || storeCacheKey;
    //清空数据
    shareStoreMap[needDeleteKey] = null;
  };

  useUnmount(() => {
    if (leavePageClear) {
      deleteStore();
    }
  });

  return {
    createShareStore: saveStore,
    deleteStore
  };
};

export default useShareStore;
