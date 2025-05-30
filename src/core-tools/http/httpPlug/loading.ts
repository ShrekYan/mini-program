import Taro from "@tarojs/taro"
import type {HttpPluginOptions} from "./../http";


export const openLoading = ({options}: Partial<HttpPluginOptions>) => {
  options = options || {};
  if (options.isLoading) {
    Taro.showLoading({
      title: "正在加载...",
      mask: true,
    });
  }
};

export const closeLoading = ({options}: Partial<HttpPluginOptions>) => {
  //延迟300毫秒关闭loading,否则会出现一闪而过的效果体验性不是很友好。
  options = options || {};
  const delayTime = 300;
  if (options.isLoading) {
    setTimeout(() => {
      Taro.hideLoading({});
    }, delayTime);
  }
};
