import {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'

/**
 * 设置微信小程序头部标题
 * @param passTitle
 * @returns {*}
 */
const useSetTitle = (passTitle: string) => {
  const [title, setTitle] = useState<string>(passTitle);

  useEffect(function () {
    if (title) {
      //设置标题
      Taro.setNavigationBarTitle({
        title: title
      });
    }
  }, [title]);
  
  return setTitle;
};

export default useSetTitle;
