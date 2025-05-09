import routes from "./routes/index"

export default defineAppConfig({
  pages: [
    "pages/index/index"
  ],
  subpackages:routes,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  __usePrivacyCheck__:true
})
