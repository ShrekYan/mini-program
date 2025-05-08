export default defineAppConfig({
  pages: [
    "pages/index/index"
  ],
  subpackages:[
    {
      "root":"pages/subpackage/product",
      "pages":[
        "common/rateStructure/index", //费率结构页面
      ],
    }
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }
})
