import type {IOptions} from "./http";
import {openLoading, closeLoading} from "./httpPlug/loading";


export interface IHttpPromiseStatusResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface IHttpPromiseAll {
  <IResponse>(promiseArray: any[], options: IOptions | undefined): Promise<IResponse>;
}

export interface IHttpPromiseAllForKey {
  <IResponse>(promiseArray: any[], p?: { isLoading: boolean }): Promise<IResponse>
}

export interface IHttpPromiseStatusWrap {
  <IResponse>(promise: Promise<IResponse>): Promise<IHttpPromiseStatusResponse<IResponse>>
}


/**
 * 针对封装后的http请求进行promise.all封装
 * @param promiseArray
 * @param options 仅支持loading
 * @return
 */
export const httpPromiseAll = function <IResponse>(promiseArray: any[] = [], options: IOptions | undefined = {}): Promise<IResponse> {

  if (options.isLoading) {
    setTimeout(()=>{
      openLoading({options: options});
    });
  }
  return new Promise<IResponse>((resolve, reject) => {
    return Promise.all(promiseArray).then(function (resp: any) {
      if (options.isLoading) {
        closeLoading({options});
      }
      resolve(resp);
    }).catch(function (error) {
      if (options.isLoading) {
        closeLoading({options});
      }
      reject(error);
    });
  });
};

/**
 * 针对封装后的http请求进行promise.all封装
 * @param promiseArray
 * @param options 仅支持loading
 * @returns {Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>}
 */
export const httpPromiseAllForKey = function <IResponse>(promiseArray: any[], options: IOptions | undefined = {}): Promise<IResponse> {

  if (options.isLoading) {
    setTimeout(()=>{
      openLoading({options: options});
    });
  }
  return new Promise<IResponse>((resolve, reject) => {
    //获取promise数组
    const tempPromiseArray = promiseArray.map((item: { key: string, promiseFn: Promise<object> }) => {
      return item.promiseFn;
    });

    return Promise.all(tempPromiseArray).then(function (resp) {
      if (options.isLoading) {
        closeLoading({options});
      }
      let result: IResponse = {} as IResponse;

      resp.map((item, index) => {
        result[promiseArray[index].key] = item;
      });
      resolve(result);
    }).catch(function (error) {
      if (options.isLoading) {
        closeLoading({options});
      }
      reject(error);
    });
  });
};


/**
 * 添加promise状态
 * @param promise
 * @returns {Promise<unknown>}
 */
export const httpPromiseStatusWrap = function <IResponse>(promise: Promise<IResponse>): Promise<IHttpPromiseStatusResponse<IResponse>> {
  return new Promise((resolve) => {
    if (promise) {
      promise.then(function (data) {
        resolve({
          isSuccess: true,
          data: data
        });
      }, function (data) {
        resolve({
          isSuccess: false,
          data: data
        });
      });
    } else {

      resolve({
        isSuccess: false,
        data: {} as IResponse
      });
    }
  });
};
