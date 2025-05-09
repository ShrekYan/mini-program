import {PropsWithChildren} from "react"
import {useDidHide, useDidShow,useError, useLaunch, usePageNotFound, useUnhandledRejection} from "@tarojs/taro"
import "./app.scss"

function App({children}: PropsWithChildren<any>) {
  useLaunch((options) => {
    console.log(options);
    console.log("App launched.")
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

  return children;
}


export default App
