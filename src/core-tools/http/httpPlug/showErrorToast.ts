import Taro from "@tarojs/taro"
import { debounce } from "es-toolkit";

export default function () {
  const debouncedLog = debounce((title) => {
    Taro.showToast({
      title: title,
      icon: "none",
      duration: 3000,
      mask: true
    });
  }, 300);
  return debouncedLog;
}
