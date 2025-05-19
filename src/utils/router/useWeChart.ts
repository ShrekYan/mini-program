import useStorage from "@utils/storage/useStorage"
import Taro from "@tarojs/taro";

const CACHE_KEY = {
  MinProgramCode: "MinProgramCode",
  UserProfile: "UserProfile"
};

const useWeChart = () => {

  const {localStorage} = useStorage();

  /**
   * 缓存中获取微信小程序code代码
   */
  const getMinProgramCodeByCache = () => {
    return localStorage.getItem(CACHE_KEY.MinProgramCode);
  };

  /**
   * 缓存中设置微信小程序code代码
   * @param code
   */
  const setMinProgramCodeByCache = (code: string) => {
    return localStorage.setItem(CACHE_KEY.MinProgramCode, code);
  };

  /**
   * 登陆
   */
  const login = () => {
    return new Promise<Taro.login.SuccessCallbackResult>((resolve, reject) => {
      Taro.login({
        success(data) {
          resolve(data);
        },
        fail(errMsg) {
          reject(errMsg);
        }
      });
    })
  };

  /**
   * 获取小程序code
   */
  const getMinProgramCode = () => {
    return new Promise((resolve) => {
      const minCode = getMinProgramCodeByCache();
      if (minCode) {
        //检查小程序code码是否过期
        Taro.checkSession({
          success() {
            resolve(minCode);
          },
          fail() {
            //如果是失效状态，登陆后获取小程序code代码
            login().then((data) => {
              setMinProgramCodeByCache(data.code);
              resolve(data);
            });
          }
        })
      } else {
        //登陆后获取小程序code代码
        login().then((data) => {
          setMinProgramCodeByCache(data.code);
          resolve(data.code);
        });
      }
    })
  };

  /**
   * 缓存中获取微信用户授权信息
   */
  const getUserProfileByCacheInfo = (dateTime:number, intervalDay?:number) => {
    const userAuthInfo = localStorage.getItem(CACHE_KEY.UserProfile) || {};
    const currentTime = dateTime;
    const saveTime = userAuthInfo.dateTime;
    const _intervalDay = intervalDay || 1;
    const intervalMs = _intervalDay * 24 * 3600 * 1000;
    //保存间隔到期删除用户授权信息
    if (currentTime - saveTime > intervalMs) {
      //清空信息
      setUserProfileByCacheInfo(undefined);
      return null;
    } else {
      return userAuthInfo;
    }
  };

  /**
   * 缓存中设置微信用户授权信息
   */
  const setUserProfileByCacheInfo = (data?: { data: Taro.getUserProfile.SuccessCallbackResult, dateTime: number }) => {
    return localStorage.setItem(CACHE_KEY.MinProgramCode, data || "");
  };

  /**
   * 获取用户授权信息：头像、地址、微信信息
   * @param desc
   */
  const getUserProfile = (desc: string) => {
    return new Promise((resolve, reject) => {
      //缓存中获取用户授权信息
      const userProfile = getUserProfileByCacheInfo((new Date).getTime());
      if (!userProfile) {
        Taro.getUserProfile({
          desc: desc || "用户信息授权",
          success: (res) => {
            //设置用户缓存信息
            setUserProfileByCacheInfo({
              data: res,
              dateTime: (new Date).getTime()
            });
            resolve(res);
          },
          fail(errMsg) {
            //清空信息
            setUserProfileByCacheInfo(undefined);
            reject(errMsg);
          }
        })
      } else {
        resolve(userProfile);
      }
    });
  };

  return {
    login,
    getUserProfile,
    getMinProgramCode,
    getMinProgramCodeByCache,
    setMinProgramCodeByCache
  }
};

export default useWeChart;
