import { Component, useEffect, useState } from "react"
import { View, Button } from "@tarojs/components"
import { useDidShow, useDidHide, useShareAppMessage } from "@tarojs/taro"
import createErrorBoundary from "@/components/hoc/createErrorBoundary";

function Index() {
  const [counter, setCounter] = useState(0)

  useDidShow(() => console.log("show"))

  useDidHide(() => console.log("hide"))

  useShareAppMessage(() => ({ title: "myShareTitle" }))

  function handleClick() {
    setCounter(counter + 1)
  }

  useEffect(() => {
    console.log(Component,View);
  }, []);

  useEffect(() => {
    if (counter === 2) {
      // 模拟 JS 报错
      throw new Error("I crashed!")
    }
  })

  return <Button onClick={handleClick}>{counter}</Button>
}

export default createErrorBoundary(Index)
