let sessionDataMap = {};

export default {
  /**
   * setStorage
   * @param key
   * @param value
   */
  setItem<T>(key: string, value: T) {
    sessionDataMap[key] = value;
  },
  /**
   * setItem
   * @param key
   * @returns {*}
   */
  getItem<T>(key: string) {
    const itemResult: T | any = sessionDataMap[key];
    return itemResult;
  },
  /**
   * 获取Storage所有的key
   * @returns {*}
   */
  keys() {
    return Object.keys(sessionDataMap);
  },
  /**
   * 本地缓存中移除指定key
   * @param key
   * @returns {*}
   */
  removeItem(key: string) {
    delete sessionDataMap[key];
  },
  /**
   * 清空缓存
   * @param isSync
   * @returns {*}
   */
  clear() {
    sessionDataMap = {};
  }
}
