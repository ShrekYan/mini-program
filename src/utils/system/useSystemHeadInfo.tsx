import Taro from "@tarojs/taro"

interface SystemHeadInfo {
  statusBarHeight: number,
  menuHeight: number,
  menuTop: number,
  navBarHeight: null | number,
  navStatusBarHeight: number,
  iosSABottom: number
}

const useSystemHeadInfo = () => {

  /**
   * 保存头部菜单信息
   * @return SystemHeadInfo
   */
  const getSystemHeadInfo = (): SystemHeadInfo => {
    //菜单信息
    const menuInfo = Taro.getMenuButtonBoundingClientRect();
    //系统信息
    const systemInfo = Taro.getSystemInfoSync() || {};

    // 屏幕顶部状态栏高度（顶部安全区域）
    let statusBarHeight = Number(systemInfo.statusBarHeight);

    // 获取胶囊区信息
    let menu = menuInfo;

    // 胶囊区高度
    let menuHeight = menu.height;

    // 胶囊区距离屏幕顶部的距离
    let menuTop = menu.top;

    // 屏幕顶部导航栏高度
    let navBarHeight = menu.height + (menu.top - statusBarHeight) * 2;

    // 屏幕顶部状态栏加导航栏高度
    let navStatusBarHeight = statusBarHeight + menu.height + (menu.top - statusBarHeight) * 2;
    // 屏幕底部安全区高度
    let iosSABottom = 0;

    if (systemInfo.safeArea) {
      iosSABottom = Number(systemInfo.screenHeight - systemInfo?.safeArea?.bottom || 0)
    }

    return {
      statusBarHeight: statusBarHeight,
      menuHeight: menuHeight,
      menuTop: menuTop,
      navBarHeight: navBarHeight,
      navStatusBarHeight: navStatusBarHeight,
      iosSABottom: iosSABottom
    }
  };

  return {
    getSystemHeadInfo
  }
};

export default useSystemHeadInfo;

