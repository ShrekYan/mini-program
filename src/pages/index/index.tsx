import {
  useDidHide,
  useDidShow,
  useLoad,
  usePageScroll,
  useReady,
  useRouter,
  useSaveExitState,
  useShareAppMessage,
  useUnload
} from "@tarojs/taro"
import {Text, View} from "@tarojs/components"
import {useEffect} from "react"
import "./index.scss"

export default function Index() {

  const router = useRouter();

  console.log(router);
  useLoad((options) => {
    console.error("Page loaded.11");
    console.log(options);
  });

  useReady(() => {

  });

  useDidHide(() => {
    console.log("useDidHide");
  });

  useDidShow(() => {
    console.log("useDidShow");
  });

  useEffect(() => {
    console.error("useEffect");
  }, []);

  useUnload(() => {
    console.log("useUnload");
  });

  usePageScroll(() => {
    console.log("usePageScroll");
  });

  useShareAppMessage((res) => {
    console.log(res);
    return {
      title: "",
      path: ""
    }
  });

  useSaveExitState(() => {
    return {
      data: {},
      expireTimeStamp: 10000
    }
  });

  return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
  )
}
