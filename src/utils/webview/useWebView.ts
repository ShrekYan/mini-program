import Taro from "@tarojs/taro";
import {compile} from "path-to-regexp"
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

  /**
   * 编译路径后开启webView
   * /product/rateStructure/:productId
   * @param path
   * @param params
   */
  const openWebViewByCompile = useCallback((path: string, params: Record<string, string>) => {
    const _path = compile(path)(params);
    openWebView(_path);
  }, []);

  return {
    openWebView,
    openWebViewByCompile
  }
};

export default useWebView;

