import React, {useEffect} from "react";
import {View} from "@tarojs/components";
// import useService from "@Service/useService";

const CodeSlider: React.FC<{
  visible: boolean,
  onFail: () => void,
  onClose: () => void,
  onCheck: (data: any) => void
}> = ({visible, onFail, onClose, onCheck}) => {
  // const [{basicService}] = useService();

  //滑动验证码-嵌入式
  const config = {
    mode: "pop",                             //弹出式pop，固定fixed, 默认：pop
    captchaType: "blockPuzzle",              //验证码类型：滑块blockPuzzle，点选clickWord，默认：blockPuzzle
    imgSize: {                               //底图大小, 默认值：{ width: "310px",height: "155px"}
      width: "600rpx",
      height: "400rpx",
    },
    barHeight: "26rpx",
    barSize: {                               //滑块大小，默认值：{ width: "310px",height: "40px"}
      width: "114rpx",
      height: "400rpx",
    },
    vSpace: 40,                               //底图和verify-bar-area间距，默认值：5像素
    blockImgSpace: 19,
    getCode: () => {                         //获取图形验证码
      // return basicService.queryVerifyCode({
      //   canvasWidth: 300,
      //   canvasHeight: 200
      // });
    },
    verifyCheck: (data) => {                    //校验验证码
      return onCheck && onCheck(data);
    },
    fail: res => {                           //失败回调，默认空
      console.log("失败响应---->", res);
      onFail && onFail();
    },
    close: () => {                           //弹出式pop时，关闭弹框
      onClose && onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      //获取图形验证码
    }
  }, [visible])

  return (
    <View>
      {/*@ts-ignore*/}
      <aj-captcha className="demo1" opt={config}></aj-captcha>
    </View>
  )
}

export default CodeSlider;
