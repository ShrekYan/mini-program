import showErrorToastFn from "./showErrorToast"
import type {HttpPluginOptions} from "./../http";
import {NETWORK} from "./plugConfig";


type showErrorToastType = (message: string) => void;

//解决提示方法重复执行导致提示语闪屏现象
const showErrorToast: showErrorToastType = showErrorToastFn();

export default ({options}: HttpPluginOptions) => {
  if (!options.backupMockData) {
    showErrorToast(NETWORK.ERROR_MSG);
  }
}
