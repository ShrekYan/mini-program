import {useEffect} from "react"
import type {Page} from "@tarojs/taro"
import Taro from "@tarojs/taro"
import {listenRoute} from "@utils/router/router";
import useUrl from "@utils/url/useUrl"
import type {IRouteConfig, IShareConfig} from "@utils/router/routeInfo";
import allRoutesConfig from "./routeInfo"


/**
 * 路由的shareConfigList分享配置中的path添加完整路径
 * @param arrayRoutesData
 */
const getNewRouteArrayByShareInfo = (arrayRoutesData: IRouteConfig[]) => {
  return arrayRoutesData.map((mainItem) => {
    if (mainItem.shareConfigList) {
      mainItem.shareConfigList.map((shareInfoItem) => {
        if (mainItem.root) {
          shareInfoItem.path = `${mainItem.root}/${shareInfoItem.path}`;
        }
      })
    }
    return mainItem;
  });
};

/**
 * 获取平铺分享列表
 * @param arrayRoutesData
 */
const getTileShareInfoArray = (arrayRoutesData: IRouteConfig[]) => {
  let shareInfoArray: IShareConfig[] = [];
  arrayRoutesData.map((mainItem) => {
    if (mainItem.shareConfigList) {
      shareInfoArray = shareInfoArray.concat(mainItem.shareConfigList);
    }
  });
  return shareInfoArray;
};

/**
 * 根据路径查询分享信息
 * @param tileShareInfoArrayData
 * @param routePath
 */
const getShareInfoByPath = (tileShareInfoArrayData: IShareConfig[], routePath: string | undefined): IShareConfig | null => {
  let currentShareInfo;
  tileShareInfoArrayData.map((shareInfo) => {
    if (shareInfo.path === routePath) {
      currentShareInfo = shareInfo;
    }
  });
  return currentShareInfo;
};

const newRouteArray = getNewRouteArrayByShareInfo(allRoutesConfig);
const tileShareInfoArray = getTileShareInfoArray(newRouteArray);

const useShareInfo = () => {
  const {getImagePath} = useUrl();
  /**
   * 设置分享信息
   * @param res
   * @param pages
   */
  const setUpShareInfo = (pages: Page[], res?: { path: string, query: string }) => {
    //获取当前页面
    let currentView = pages[pages.length - 1];

    //获取当前的分享信息
    let currentPageShareInfo = getShareInfoByPath(tileShareInfoArray, res ? res.path : currentView?.route);

    //去除query中的用户信息
    //let queryInfoInUrl = purBasic.urlParams.deleteParamsInQuery(res ? res.query : currentView?.options, ["userInfo"]);

    let queryInfoInUrl = res ? res.query : currentView?.options;

    if (currentView && currentPageShareInfo) {

      //开启分享功能
      Taro.showShareMenu({withShareTicket: true});

      //设置分享信息内容
      currentView.onShareAppMessage = () => {
        return {
          title: currentPageShareInfo && currentPageShareInfo.shareInfo.title || "",
          path: currentPageShareInfo && currentPageShareInfo.shareInfo.path || res ? res?.path : currentView.route,   //分享页面地址
          query: queryInfoInUrl,
          imageUrl: currentPageShareInfo && currentPageShareInfo.shareInfo.image ? getImagePath(currentPageShareInfo.shareInfo.image) : null
        };
      };

    }
  };

  useEffect(() => {
    const delayTime = 100;
    setTimeout(() => {
      const pages = [Taro.Current.page] as Page[];
      //第一次进入页面时设置分享信息
      setUpShareInfo(pages, undefined);
    }, delayTime);

    listenRoute((path) => {
      const [prefix, queryStr] = path.split("?");
      const pages = Taro.getCurrentPages();
      //设置分享信息
      setUpShareInfo(pages, {
        path: prefix,
        query: queryStr
      });
    });
  }, []);
};

export default useShareInfo;

