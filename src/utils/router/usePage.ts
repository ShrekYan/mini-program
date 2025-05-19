import Taro from "@tarojs/taro"

const usePage = () => {
  /**
   * 获取当前页面
   */
  const getCurrentPage = () => {
    const pages = Taro.getCurrentPages();
    const currentPages = pages[pages.length - 1];
    return currentPages;
  }

  /**
   * 获取上一个页面
   * @returns {*}
   */
  const getPrevPage = () => {
    const pages = Taro.getCurrentPages();
    const prevPage = pages[pages.length - 2];
    return prevPage;
  }

  return {
    getCurrentPage,
    getPrevPage,
    /**
     * 获取当前的路由路径
     */
    getCurrentPagePath() {
      const currentPage = getCurrentPage();
      return "/" + currentPage.route;
    },
    /**
     * 获取当前页面整个路由+参数
     */
    getCurrentPagePathValue() {
      const currentPage = getCurrentPage();
      return currentPage.$taroPath;
    }
  }

};

export default usePage;
