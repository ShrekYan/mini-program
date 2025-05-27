
import {PropsWithChildren} from "react"
import {useDidHide, useDidShow, useError, useLaunch, usePageNotFound, useUnhandledRejection} from "@tarojs/taro"
import useSystemHeadInfo from "@utils/system/useSystemHeadInfo"
import {initRouteListener} from "@utils/router/router"
import useInterceptor from "@utils/router/useInterceptor"
import usePageEnterAndLeave from "@utils/router/usePageEnterAndLeave"
import useShareInfo from "@utils/router/useShareInfo"
import  "@utils/router/routeInfo"
import  "@/assets/font/iconfont.scss"
import "./app.scss"

function App({children}: PropsWithChildren<any>) {
  const {getSystemHeadInfo} = useSystemHeadInfo();

  useLaunch((options) => {
    initRouteListener();
    console.log(options);
    console.log(getSystemHeadInfo());
  })

  useDidShow((options) => {
    console.log(options);
    console.log("useDidShow");
  });

  useDidHide(() => {
    console.log("useDidHide");
  });

  usePageNotFound((data) => {
    console.log(data);
  });

  useError((error) => {
    console.error(error);
  });


  useUnhandledRejection((data) => {
    console.log(data);
  });

  //拦截器
  useInterceptor();

  //页面进入和离开事件
  usePageEnterAndLeave();

  //自定义分享
  useShareInfo();

  return children;
}


export default App
