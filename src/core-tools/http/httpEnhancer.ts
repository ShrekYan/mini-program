import http from "./http"
import type {PluginFunction}  from "./httpFnStore"

/**
 * 增强的http
 */
export default class httpEnhancer extends http {
  constructor(urlPrefix: string, mockUrlPrefix: string) {
    super(urlPrefix, mockUrlPrefix);
  }

  addBeforePlug = (plug: PluginFunction) => {
    this.addBeforeFn(plug);
    return this;
  };

  addAfterPlug = (plug: PluginFunction) => {
    this.addAfterFn(plug);
    return this;
  };

  addErrorPlug = (plug: PluginFunction) => {
    this.addErrorFn(plug);
    return this;
  };

  addFinallyPlug = (plug: PluginFunction) => {
    this.addFinallyFn(plug);
    return this;
  };
}
