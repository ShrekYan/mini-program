
import {useEffect} from "react"
import {listenRoute} from "./router"

const authConfig: Record<string, string | string[]> = {
  product: ["pages/subpackage/product/common/rateStructure/index"]
};

const ignoreConfig = {
  product:[]
}

/**
 * 检查path是否需要校验
 * @param path
 * @returns {boolean}
 */
const checkAuthConfigFn = (path: string) => {
  const {zero, one, negativeOne} = {zero: 0, one: 1, negativeOne: -1};

  if (path === "/login") {
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  for (let ignoreKey in ignoreConfig) {
    const ignoreItem = ignoreConfig[ignoreKey];
    if (Object.prototype.toString.call(ignoreItem) === "[object Array]") {
      for (let i = zero, j = ignoreItem.length; i < j; i++) {
        if (path.indexOf(ignoreItem[i]) > negativeOne) {
          return false;
        }
      }
    } else {
      //获取父级routePath
      let splitArray = path.split("/") || [];
      let parentRoutePath = splitArray[one];
      if (parentRoutePath === ignoreItem) {
        return false;
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  for (let authKey in authConfig) {
    const authItem = authConfig[authKey];
    if (Object.prototype.toString.call(authItem) === "[object Array]") {
      for (let i = zero, j = authItem.length; i < j; i++) {
        if (path.indexOf(authItem[i]) > negativeOne) {
          return true;
        }
      }
    } else {
      //获取父级routePath
      let splitArray = path.split("/") || [];
      let parentRoutePath = splitArray[one];
      if (parentRoutePath === authItem) {
        return true;
      }
    }
  }
  return false;
};

const useInterceptor = ()=>{
  useEffect(() => {
    listenRoute((path)=>{
      //验证页面权限
      const checkPageAuth = checkAuthConfigFn(path);
      const userInfo = null;
      console.log(path);
      if(checkPageAuth && !userInfo){
        console.log("跳转到登陆页面");
      }
    });
  }, []);
};

export default useInterceptor;
