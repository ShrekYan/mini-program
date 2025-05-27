import routes from "./routes/index"

export default defineAppConfig({
  pages: [
    "pages/Home/index",
    "pages/WebView/index"
  ],
  subpackages:routes,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  requiredBackgroundModes:[],
  //分包预下载规则
  preloadRule:{},
  debug: process.env.NODE_ENV === "development",
  __usePrivacyCheck__:true,
  entryPagePath:"pages/Home/index",
  style:"v2"
})
