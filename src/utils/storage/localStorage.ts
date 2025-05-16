import Taro from "@tarojs/taro"

type KeyParamType = string;
type valueType = Object;

export default {
  /**
   * setStorage
   * @param key
   * @param value
   */
  setItem(key: KeyParamType, value: valueType) {
    //如果value是string
    if (typeof value === "string") {
      return Taro.setStorageSync(key, value);
    }

    //如果value是Obj
    let _local = Taro.getStorageSync(key) || {};
    for (let _key in value) {
      _local[_key] = value[_key];
    }

    if (!Object.keys(value).length) {
      _local = value;
    }

    return Taro.setStorageSync(key, _local);
  },
  /**
   * setItem
   * @param key
   * @returns {*}
   */
  getItem<T>(key: KeyParamType) {
    return Taro.getStorageSync<T | any>(key);
  },
  /**
   * 获取Storage所有的key
   * @returns {*}
   */
  keys() {
    return Taro.getStorageInfoSync().keys;
  },
  /**
   * 本地缓存中移除指定key
   * @param key
   * @returns {*}
   */
  removeItem(key: KeyParamType) {
    return Taro.removeStorageSync(key);
  },
  /**
   * 清空缓存
   * @param isSync
   * @returns {*}
   */
  clear() {
    return Taro.clearStorage();
  }
}
