import Taro from "@tarojs/taro";
import {useCallback} from "react"
import useUrl from "../url/useUrl"

const useWebView = () => {
  const urlHook = useUrl();

  /**
   * 开启webView
   * @param path 路径
   * @param isRedirect 是否重定向
   */
  const openWebView = useCallback((path: string, isRedirect: boolean = false) => {
    const webViewUrl = urlHook.getWebViewPageUrl(path);
    const to = isRedirect ? Taro.redirectTo : Taro.navigateTo;
    // redirectTo
    to({
      url: `/pages/WebView/index?url=${webViewUrl}`
    });
  }, []);

  return {
    openWebView
  }
};

export default useWebView;

