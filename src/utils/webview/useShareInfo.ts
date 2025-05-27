import sessionStorage from "@utils/storage/sessionStorage"

interface WebviewShareInfo {
  urlMark: string;
  shareInfo: {
    title: string;
    path: string;
    sharePageUrl: string;
    shareImageUrl: string;
  }
}

const useShareInfo = () => {
  const cacheKey = "shareInfo";

  /**
   * 获取分享信息
   */
  const getShareInfo = (): WebviewShareInfo[] => {
    return sessionStorage.getItem<WebviewShareInfo[]>(cacheKey) || [];
  }

  /**
   * 保存分享信息
   */
  const saveShareInfo = ({urlMark, shareInfo}: WebviewShareInfo) => {
    const cacheShareInfoData = getShareInfo();
    //如果不存在数据则直接添加
    if (!cacheShareInfoData || cacheShareInfoData.length === 0) {
      cacheShareInfoData.push({
        urlMark,
        shareInfo
      });
    } else {
      const index = cacheShareInfoData.findIndex((shareInfoItem) => {
        return shareInfoItem.urlMark === urlMark && shareInfoItem.shareInfo.title === shareInfo.title;
      });
      //存在当前分享信息
      if(index > -1){
        const _tempData = cacheShareInfoData[index];
        //删除当前数据
        cacheShareInfoData.splice(index, 1);
        //最新的分享数据永远在数据最后一个
        cacheShareInfoData.push(_tempData);
      }else {
        cacheShareInfoData.push({
          urlMark,
          shareInfo
        });
      }
    }
    sessionStorage.setItem<WebviewShareInfo[]>(cacheKey, cacheShareInfoData);
  };

  return {
    saveShareInfo,
    getShareInfo
  }
};

export default useShareInfo;
