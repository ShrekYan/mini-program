import routes from "@/routes/index";

//分享配置
export interface IShareConfig {
  path: string;
  shareInfo: {
    path: string;
    title: string;
    image?: string
  }
}

//路由配置
export interface IRouteConfig {
  root: string;
  name?: string;
  pages: string[],
  shareConfigList?: IShareConfig[]
}

/**
 * 主包路由配置
 */
const mainPackagePage: IRouteConfig[] = [{
  root: "",
  name: "",
  pages: ["pages/index/index"],
  shareConfigList: [
    {
      path: "pages/index/index",
      shareInfo: {
        title: "中欧基金旗下 专业基金投顾",
        path: "/pages/index/index",
        image: "/business/Home/bg-homeShare.png"
      }
    }
  ]
}];

const allRoutesConfig = [...routes,...mainPackagePage];

export default allRoutesConfig;
