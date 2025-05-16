import Taro from "@tarojs/taro"
import queryString from "query-string"

const ROUTE_CHANGE = "ROUTE_CHANGE";

/**
 * 初始化路由监听
 */
export const initRouteListener = () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    (Taro as any).onAppRoute((res: { path: string; query: Record<string, any> | {} }) => {
      let path = res.path;
      const queryStr = queryString.stringify(res.query);
      //合并query参数到路由片段上
      if (queryStr) {
        path = `${res.path}?${queryStr}`;
      }
      //微信小程序
      Taro.eventCenter.trigger(ROUTE_CHANGE, path);
    })
  } else if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    //web
    window.addEventListener("hashchange", () => {
      Taro.eventCenter.trigger(window.location.hash);
    })
  }
};

/**
 * 监听路由变化
 * @param callback
 */
export const listenRoute = (callback: (path: string) => void) => {
  Taro.eventCenter.on(ROUTE_CHANGE, callback)
};
