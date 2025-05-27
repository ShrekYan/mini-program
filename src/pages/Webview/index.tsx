import React, {useEffect, useState} from "react"
import Taro, {useRouter, useShareAppMessage} from "@tarojs/taro"
import {View, WebView} from "@tarojs/components"
import type {WebViewProps} from "@tarojs/components/types/WebView";
import type {CommonEventFunction} from "@tarojs/components/types/common"
import usePostMessage from "@utils/webview/usePostMessage"
import useShareInfo from "@utils/webview/useShareInfo"
import queryString from "query-string"

/**
 * webView页面
 * @constructor
 */
const WebViewPage: React.FC = () => {
  const router = useRouter();
  const postMessage = usePostMessage();
  const shareInfoHook = useShareInfo();
  const [webViewUrl, setWebViewUrl] = useState<string>("");


  /**
   * 获取webView链接
   * @param url
   * @param openH5BackBtn
   */
  const getWebViewUrl = (url: string, openH5BackBtn: string | undefined) => {
    let _url = decodeURIComponent(url);
    //参数
    const webViewParams = {
      //是否为帐号退出状态
      isLogout: false,
      //渠道来源
      channel: "minProgram",
      //webView开启vConsole.log
      vcOpen: (MODAL !== "pre" && MODAL !== "prd") && "open",
      openH5BackBtn: openH5BackBtn,
      //用户信息
      userInfo: JSON.stringify({
        userId: "",
        sessionId: ""
      })
    };
    //query string
    const queryStringParams = queryString.stringify(webViewParams, {encode: false});
    //对url链接进行编码
    _url = encodeURI(`${_url}?${queryStringParams}`);
    return _url
  };

  useEffect(() => {
    const {url, openH5BackBtn} = router.params;
    if (url) {
      // getWebView(url);
      //设置webView信息
      const _url = getWebViewUrl(url, openH5BackBtn);
      console.log(_url);
      setWebViewUrl(_url);
    } else {
      //如果没有链接则返回上一级页面
      Taro.navigateBack();
    }
  }, []);

  /**
   * 分享事件
   */
  useShareAppMessage((res) => {
    const _webViewUrl = decodeURIComponent(res.webViewUrl || webViewUrl);
    if (_webViewUrl) {
      const shareInfoList = shareInfoHook.getShareInfo();
      //获取最后一个数据
      const lastData = shareInfoList[shareInfoList.length - 1];
      console.log(lastData);
      if (Object.keys(lastData || {}).length > 0) {
        return {
          title: lastData.shareInfo.title,
          path: lastData.shareInfo.path,
          imageUrl: lastData.shareInfo.shareImageUrl
        }
      }
    }
    return {}
  });

  /**
   * 加载完成事件
   * @param e
   */
  const handleLoad: CommonEventFunction<WebViewProps.onLoadEventDetail> = (e) => {
    const {src} = e.detail
    Taro.showShareMenu({withShareTicket: true});
    console.log("webView加载成功:", src)
  }

  /**
   * webViewd加载失败
   */
  const handleError: CommonEventFunction<WebViewProps.onErrorEventDetail> = (e) => {
    console.log("webView加载失败：", e.detail.src);
    const pages = Taro.getCurrentPages();
    //有浏览历史记录返回到上一级页面，否则返回到首页
    if (pages.length > 1) {
      Taro.navigateBack();
    } else {
      Taro.redirectTo({
        url: "/pages/Home/index"
      });
    }
  };

  /**
   * 消息通知事件
   * @param e
   */
  const handleMessage: CommonEventFunction<WebViewProps.onMessageEventDetail> = (e) => {
    console.log("handleMessage");
    console.log(e.detail.data);
    //触发postMessage事件
    postMessage.onWebviewPostMessage(e.detail.data?.[0]);
  };

  return (
    <View>
      <WebView
        src={webViewUrl}
        onLoad={handleLoad}
        onError={handleError}
        onMessage={handleMessage}
      />
    </View>
  )
};

export default WebViewPage;
