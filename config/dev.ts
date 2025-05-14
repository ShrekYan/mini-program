import type {UserConfigExport} from "@tarojs/cli"

export default {
  logger: {
    quiet: false,
    stats: true
  },
  compiler: {
    type: "webpack5",
    prebundle: {
      enable: true,
      exclude: ["@nutui/nutui-react-taro"],  // 排除已知冲突的模块
    }
  },
  sass:{
    data:"$bg-base: #{\"~@assets/images\"} !default;"
  },
  mini: {
  },
  h5: {}
} satisfies UserConfigExport<"webpack5">
