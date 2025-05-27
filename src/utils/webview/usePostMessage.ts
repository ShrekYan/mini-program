import type {WebViewProps} from "@tarojs/components/types/WebView";
import useUrl from "@utils/url/useUrl"
import useShareInfo  from "./useShareInfo"

// 定义策略接口
interface MessageStrategy {
  saveUserInfo?: () => void;
  clearUserInfo?: () => void;
  shareInfo?: (data: WebViewProps.onMessageEventDetail["data"][0]) => void;

  [key: string]: ((data?: unknown) => void) | undefined; // 索引签名
}

const usePostMessage = () => {

  const url = useUrl();
  const shareInfo = useShareInfo();

  const messageStrategy: MessageStrategy = {
    userInfo() {
      // // 保存用户信息，在小程序页面didShow生命周期能访问到用户信息
      // userMiddle.setCacheUserInfo(data.userInfo);
      // //从webView（渠道项目）登录后返回到小程序需要清空退出状态
      // userMiddle.removeUserLogoutStatus();
    },
    clearUserInfo() {
      // userMiddle.removeCacheUserInfo();
      // //设置退出登录状态
      // userMiddle.setUserLogoutStatus(true);
    },
    /**
     * 保存分享信息
     * @param data
     */
    shareInfo(data) {
      //标题
      const title = data.title;
      //分享链接
      const sharePageUrl = decodeURIComponent(data.sharePageUrl);
      //地址标记
      const urlMark = data.urlMark;
      //分享图片
      const shareImageUrl = data.shareImageUrl;

      //webViewPath
      const webViewPath = url.urlAddParams("/pages/WebView/index", {
        url: encodeURIComponent(sharePageUrl),
        openH5BackBtn: true
      });

      const _shareInfo = {
        title: title || "中欧财富",
        path: webViewPath,
        sharePageUrl: sharePageUrl,
        shareImageUrl: shareImageUrl
      };

      //保存分享信息
      shareInfo.saveShareInfo({
        urlMark:urlMark,
        shareInfo:_shareInfo
      })
    }
  };

  /**
   * 消息通知
   * @param data
   */
  const onWebviewPostMessage = (data: WebViewProps.onMessageEventDetail["data"]) => {
    for (const eventName in data) {
      if (messageStrategy[eventName] && typeof messageStrategy[eventName] === "function") {
        messageStrategy[eventName](data[eventName]);
      }
    }
  };

  return {
    onWebviewPostMessage
  }
};
export default usePostMessage;
