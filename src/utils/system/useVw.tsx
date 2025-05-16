import Taro from '@tarojs/taro';

// 缓存系统信息（避免重复调用同步接口）
let systemInfo: Taro.getSystemInfoSync.Result;
const getSystemInfo = () => systemInfo || (systemInfo = Taro.getSystemInfoSync());

/**
 * 动态获取设计稿基准值（兼容 Taro 配置）
 */
const getDesignWidth = () => {
  // 从 Taro 全局配置读取设计稿宽度（默认 750）
  const appConfig = Taro.getApp()?.config || {};
  return appConfig.designWidth || 750;
};

/**
 * 精确的 px 转 rpx 方法
 * @param px - 设计稿像素值
 * @param precision - 小数精度（默认 2）
 */
const px2Rpx = (px: number, precision: number = 2): string => {
  const designWidth = getDesignWidth();
  const {screenWidth} = getSystemInfo();
  //1rpx = 屏幕宽度/750
  // 计算公式：rpx = (px * designWidth) / 屏幕宽度（screenWidth）
  const ratio = designWidth / screenWidth;
  const rpxValue = Number((px * ratio).toFixed(precision));
  // 处理最小像素值（避免 0 rpx）
  return `${Math.max(rpxValue, 0.01)}rpx`;
};


/**
 * 计算实际屏幕像素值（支持动态设计稿）
 * @param px - 设计稿像素值
 * @param precision - 小数精度（默认 2）
 */
const px2RealPagePx = (px: number, precision: number = 2): number => {
  const designWidth = getDesignWidth();
  const {screenWidth} = getSystemInfo();

  // 计算公式：realPx = (px * screenWidth) / 设计稿宽度
  return Number(((px * screenWidth) / designWidth).toFixed(precision));
};


const useVw = () => {
  return {
    px2Rpx,
    px2RealPagePx
  }
};

export default useVw;
