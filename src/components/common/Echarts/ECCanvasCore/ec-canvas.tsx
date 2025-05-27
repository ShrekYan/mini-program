import Taro from "@tarojs/taro";
import React, { useState, useImperativeHandle } from "react";
import { Canvas } from "@tarojs/components";
import WxCanvas from "./wx-canvas";
import * as echarts from "./echarts";
import "./ec-canvas.scss";


const wrapTouch = (event) => {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
};

/**
 * 检查对比版本号
 * @param v1
 * @param v2
 * @returns {number}
 */
const compareVersion = (v1, v2) => {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
};

const ECCanvas = React.forwardRef(({ canvasId, ec = {} }, ref) => {
  const [zero,one,oneThousand] = [0,1,1000];

  //保存chart实例
  const [chart, setChart] = useState();
  const [criticalValue,setCriticalValue] = useState(zero);

  //暴露init方法给调用方面
  useImperativeHandle(ref, () => ({
    init: (callback) => {
      init(callback);
    },
  }));

  //echart预处理程序
  const eChartPreprocessor = () => {
    echarts.registerPreprocessor((option) => {
      if (option && option.series) {
        if (option.series.length > zero) {
          option.series.forEach((series) => {
            series.progressive = zero;
          });
        } else if (typeof option.series === "object") {
          option.series.progressive = zero;
        }
      }
    });
  };


  /**
   * 检查当前微信版本是否高于2.9.0可以使用新版canvas，目前组件仅支持新版canvas
   * 2.9.0
   */
  const isCurVersionSupport = () => {
    const wxVersion = Taro.getSystemInfoSync().SDKVersion;
    const supportCanvasWXVersion = "2.9.0";
    const isSupportCanvas =
      compareVersion(wxVersion, supportCanvasWXVersion) >= 0;
    if (!isSupportCanvas) {
      console.error("建议将微信基础库调整大于等于2.9.0版本。获得更好的性能");
    }
  };

  //ECCanvas初始化
  const init = (callback) => {
    //检查当前微信版本是否支持canvas
    isCurVersionSupport();
    //echart预处理程序
    eChartPreprocessor();

    setTimeout(() => {
      initByNewWay(callback);
    }, 30);
  };

  const initByNewWay = (callback) => {
    //获取dpr
    const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
    //小程序获取canvas dom（异步操作）
    const query = Taro.createSelectorQuery();
    //这里要使用唯一的id获取对应的canvas dom，后续会使用这个canvas dom生成chart
    //传入同一个canvas时，图表配置会相互覆盖
    //为什么要使用id获取，因为使用class时获取不到，目前原因还没有找到
    query
      .select(`#${canvasId}`)
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        const canvasNode = res[zero].node;
        const canvasWidth = res[zero].width;
        const canvasHeight = res[zero].height;
        const ctx = canvasNode.getContext("2d");
        //新建canvas实例
        const canvas = new WxCanvas(ctx, canvasId, canvasNode);
        echarts.setCanvasCreator(() => {
          return canvas;
        });
        if (typeof callback === "function") {
          setChart(callback(canvas, canvasWidth, canvasHeight, canvasDpr));
        } else if (typeof renderChart === "function") {
          //调用方传入init参数
          setChart(ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr));
        }
      });
  };

  const touchStart = (e) => {
    // 添加拦截，解决折线图触摸事件与页面垂直方向滑动冲突导致页面滑动事件失灵问题
    setCriticalValue(criticalValue+one)
    if (chart && e.touches.length > zero && criticalValue > oneThousand) {
      var touch = e.touches[zero];
      var handler = chart.getZr().handler;
      handler.dispatch("mousedown", {
        zrX: touch.x,
        zrY: touch.y,
      });
      handler.dispatch("mousemove", {
        zrX: touch.x,
        zrY: touch.y,
      });
      handler.processGesture(wrapTouch(e), "start");
    }
  };

  const touchMove = (e) => {
    if (chart && e.touches.length > zero) {
      var touch = e.touches[zero];
      var handler = chart.getZr().handler;
      handler.dispatch("mousemove", {
        zrX: touch.x,
        zrY: touch.y,
      });
      handler.processGesture(wrapTouch(e), "change");
    }
  };

  const touchEnd = (e) => {
    if (chart) {
      setCriticalValue(zero)
      const touch = e.changedTouches ? e.changedTouches[zero] : {};
      var handler = chart.getZr().handler;
      handler.dispatch("mouseup", {
        zrX: touch.x,
        zrY: touch.y,
      });
      handler.dispatch("click", {
        zrX: touch.x,
        zrY: touch.y,
      });
      //添加mouseout事件派发，在折线图触摸离开后触发器离开事件，关闭tooltip显示
      handler.dispatch("mouseout",{
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), "end");
    }
  };

  return (
    <Canvas
      ref={ref}
      type="2d"
      id={canvasId}
      className="ec-canvas"
      canvasId={canvasId}
      onTouchStart={ec.disableTouch ? "" : touchStart}
      onTouchMove={ec.disableTouch ? "" : touchMove}
      onTouchEnd={ec.disableTouch ? "" : touchEnd}
    ></Canvas>
  );
});

export default ECCanvas;
