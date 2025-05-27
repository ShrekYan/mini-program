import React, {useEffect, useRef} from "react"
import ECCanvasCore from "@components/common/Echarts/ECCanvasCore/index"
import {View} from "@tarojs/components"
import "./index.scss"

const Chart: React.FC<{ canvasId: string }> = ({canvasId}) => {
  const chartRef = useRef<any>();

  useEffect(() => {
    chartRef.current?.refresh({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line"
        }
      ]
    });
  }, []);

  return (
    <View>
      Chart
      {/*@ts-ignore*/}
      <ECCanvasCore canvasId={canvasId} ref={chartRef}/>
    </View>
  )
};

export default Chart;
