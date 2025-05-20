import React, {useEffect, useRef, useState} from "react"
import {Button, Image, View} from "@tarojs/components"
import Taro, {useDidHide, useDidShow, useShareAppMessage} from "@tarojs/taro"
import createErrorBoundary from "@/components/hoc/createErrorBoundary";
import type {TaroElement} from "@tarojs/runtime";
import useUrl from "@utils/url/useUrl"
import styles from "./index.module.scss"
import Chart from "./components/Chart/index"

function Index() {
  const [counter, setCounter] = useState(0);
  const url = useUrl();
  const ref = useRef<TaroElement>();

  useDidShow(() => console.log("show"))

  useDidHide(() => console.log("hide"))

  useShareAppMessage(() => ({title: "myShareTitle"}))

  function handleClick() {
    setCounter(counter + 1)
  }

  /**
   * 跳转到费效率结构
   */
  function handleGotoRate() {
    Taro.navigateTo({
      url: `/pages/subpackage/product/common/rateStructure/index?productId=${622080}`
    });
  }

  useEffect(() => {
    console.log(Taro.getEnv());
  }, []);

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().select(`#${ref?.current?.sid}`)
        .boundingClientRect()
        .exec((res) => {
          console.log(res);
        });
    });
  }, []);

  useEffect(() => {

    if (counter === 2) {
      // 模拟 JS 报错
      throw new Error("I crashed!")
    }
  })


  return (
    <React.Fragment>
      <Chart canvasId="test1" />
      <Chart canvasId="test2" />
      <Button ref={ref} type="primary" onClick={handleGotoRate}>跳转到费率结构</Button>
      <Button onClick={handleClick}>{counter}</Button>
      <Image src={url.getImagePath("/bg/bg-newFundImage.png")} />
      <Image src={url.getImagePath("/bg/bg-idCard.png")} />
      <View className={styles.testPic}></View>
      <View className={styles.testPic1}></View>
    </React.Fragment>
  )
}

export default createErrorBoundary(Index)
