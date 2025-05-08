import Taro from "@tarojs/taro"

/**
 * 请求枚举
 */
enum REQUEST_TYPE {
  POST = "POST",
  GET = "GET"
}

/**
 * 检查请求链接判断
 * @param requestUrl
 */
function checkRequestUrl(requestUrl: string): boolean | never {
  if (!requestUrl) {
    throw new Error("Please fill in the URL path!");
  }
  return true;
}


interface IHttpCore {
  get<KParams, TResponse>(requestUrl: string, paramsData: KParams): Taro.RequestTask<TResponse> | never;

  post<KParams, TResponse>(requestUrl: string, paramsData: KParams, headers: HeadersInit): Taro.RequestTask<TResponse> | never
}

class HttpCore implements IHttpCore {
  /**
   * get请求
   * @param requestUrl
   * @param paramsData
   */
  get<KParams, TResponse>(requestUrl: string, paramsData: KParams): Taro.RequestTask<TResponse> | never {
    if (!checkRequestUrl(requestUrl)) {
      throw new Error("The requested link was not found!");
    }
    return Taro.request({
      url: requestUrl,
      data: paramsData,
      method: REQUEST_TYPE.GET,
      dataType: "json"
    });
  }

  /**
   * post请求
   * @param requestUrl
   * @param paramsData
   * @param headers
   */
  post<KParams, TResponse>(requestUrl: string, paramsData: KParams, headers: HeadersInit): Taro.RequestTask<TResponse> | never {
    if (!checkRequestUrl(requestUrl)) {
      throw new Error("The requested link was not found!");
    }
    return Taro.request({
      url: requestUrl,
      data: paramsData,
      method: REQUEST_TYPE.POST,
      header: {
        "content-type": "application/json",
        ...headers
      },
      dataType: "json"
    });
  }
}

export default new HttpCore();
