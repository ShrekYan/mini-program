import React, {useImperativeHandle, useRef } from "react";
import * as echarts from "./echarts";
import ECCanvas from "./ec-canvas";

const EChart = React.forwardRef(({ canvasId }, ref) => {
  const canvasRef = useRef();

  useImperativeHandle(ref, () => ({
    refresh: refresh,
  }));

  /**
   * 图表实例refresh
   * @param option
   */
  const refresh = (option) => {
    if (!option) return;
    canvasRef.current.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr,
      });
      //设置canvas使用的chart实例
      canvas.setChart(chart);
      //图表配置
      //animation关闭绘制图表动画，解决切换图表时的闪现问题
      chart.setOption({
        ...option,
        animation:false
      });
      //图例选中事件
      chart.on("legendselectchanged", (params) => {
        const { selected } = params;
        let isCanSelect = Object.keys(selected).every((item) => {
          return selected[item]
        });
        if(!isCanSelect){
          return false
        }
        chart.dispatchAction({
          type: "legendSelect",
          name:params.name
        });
      });
      return chart;
    });
  };

  //todo 这里需要修改，使用同一个init时，无法在同一页面中创建多个chart
  return <ECCanvas ref={canvasRef} canvasId={canvasId} />;
});

export default EChart;
