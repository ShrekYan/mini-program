import {useCallback} from 'react'
import {animationMap} from '@Plugins/easing'

const animationMapObject: object = animationMap;

/**
 * 动画执行
 * @param params
 * animationType 执行动画类型
 * startValue 开始值
 * endValue 结束值
 * duration 持续时间
 * progressCallback 进度回调函数
 * completeCallback 完成回调函数
 */
const useEasing = (params = {
  animationType: 'easeInOutCirc',
  startValue: 0,
  endValue: 0,
  duration: 3000,
  progressCallback: function () {
  },
  completeCallback: function () {
  }
}) => {
  const startTime = Date.now();
  const startValue = params.startValue || 0;
  const endValue = params.endValue;
  const progressCallback: Function = params.progressCallback || function () {
  };
  const duration = params.duration || 3000;
  const animationType = params.animationType || 'easeInOutCirc';
  const completeCallback: Function = params.completeCallback || function () {
  };

  return function task() {
    const elapsed = Date.now() - startTime;
    if (elapsed < duration) {
      window.requestAnimationFrame(function () {
        progressCallback && progressCallback(animationMapObject[animationType](elapsed, startValue, endValue, duration));
        task();
      });
    } else {
      completeCallback && completeCallback(animationMapObject[animationType](elapsed, startValue, endValue, duration));
    }
  }
};

const useEasingWrap = () => {
  const easingFunction = useCallback(useEasing, []);
  return easingFunction;
};

export const easingWrap = (params = {
  animationType: 'easeInOutCirc',
  startValue: 0,
  endValue: 0,
  duration: 3000,
  progressCallback: function () {
  },
  completeCallback: function () {
  }
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useEasing(params);
};

export default useEasingWrap;
