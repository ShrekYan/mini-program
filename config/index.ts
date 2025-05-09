import { defineConfig, type UserConfigExport } from "@tarojs/cli"
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import devConfig from "./dev"
import prodConfig from "./prod"


// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"webpack5">(async (merge, { command, mode }) => {
  console.log(command,mode);
  //运行环境变量
  console.log(process.env.TARO_ENV);
  const baseConfig: UserConfigExport<"webpack5"> = {
    projectName: "mini-program",
    date: "2025-5-7",
    designWidth(input) {
      //类型守卫
      if (typeof input === "object" && input.file && "file" in input) {
        // 配置 NutUI 375 尺寸
        if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
          return 375;
        }
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    //todo 后续需要定义
    alias: {
      "@": path.resolve(__dirname, ".././src/"),
      "@api": path.resolve(__dirname, ".././src/api"),
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    defineConstants: {
      API_URL:JSON.stringify(process.env.TARO_APP_URL)
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: "react",
    compiler: "webpack5",
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            onePxTransform: true,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
          }
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]"
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin)
      }
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js"
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css"
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            onePxTransform: false,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            baseFontSize: 20,
            maxRootSize: 40,
            minRootSize: 20
          }
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]"
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin)
      }
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV

  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
