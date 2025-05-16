import {useEffect} from 'react'
import Taro from '@tarojs/taro'

/**
 * 改变背景颜色
 * backgroundColor
 * @param backgroundColor
 */
const useChangeBgColorHook = (backgroundColor: string) => {
  useEffect(function () {
    (Taro as any).setPageStyle({
      style: {
        background: backgroundColor
      }
    });
    return function () {
      (Taro as any).setPageStyle({
        style: {
          background: null
        }
      });
    }
  });
};

export default useChangeBgColorHook;
