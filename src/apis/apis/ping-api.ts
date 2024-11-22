// tslint:disable
/**
 * blog_server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as globalImportUrl from "url";
import globalAxios from "axios";
import type { AxiosPromise, AxiosInstance } from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from "../base";
import type { RequestArgs } from "../base";
import { Configuration } from "@/apis";
/**
 * PingApi - axios parameter creator
 * @export
 */
export const PingApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * 测试服务器连接
     * @summary 测试服务器连接
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingGet: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/ping`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 测试服务器连接
     * @summary 测试服务器连接
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingGet_1: async (options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/ping`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query,
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * PingApi - functional programming interface
 * @export
 */
export const PingApiFp = function (configuration?: Configuration) {
  return {
    /**
     * 测试服务器连接
     * @summary 测试服务器连接
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async pingGet(
      options?: any,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>
    > {
      const localVarAxiosArgs =
        await PingApiAxiosParamCreator(configuration).pingGet(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 测试服务器连接
     * @summary 测试服务器连接
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async pingGet_1(
      options?: any,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>
    > {
      const localVarAxiosArgs =
        await PingApiAxiosParamCreator(configuration).pingGet_1(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * PingApi - factory interface
 * @export
 */
export const PingApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     * 测试服务器连接
     * @summary 测试服务器连接
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingGet(options?: any): AxiosPromise<object> {
      return PingApiFp(configuration)
        .pingGet(options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 测试服务器连接
     * @summary 测试服务器连接
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingGet_1(options?: any): AxiosPromise<object> {
      return PingApiFp(configuration)
        .pingGet_1(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * PingApi - interface
 * @export
 * @interface PingApi
 */
export interface PingApiInterface {
  /**
   * 测试服务器连接
   * @summary 测试服务器连接
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PingApiInterface
   */
  pingGet(options?: any): AxiosPromise<object>;

  /**
   * 测试服务器连接
   * @summary 测试服务器连接
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PingApiInterface
   */
  pingGet_1(options?: any): AxiosPromise<object>;
}

/**
 * PingApi - object-oriented interface
 * @export
 * @class PingApi
 * @extends {BaseAPI}
 */
export class PingApi extends BaseAPI implements PingApiInterface {
  /**
   * 测试服务器连接
   * @summary 测试服务器连接
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PingApi
   */
  public pingGet(options?: any) {
    return PingApiFp(this.configuration)
      .pingGet(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 测试服务器连接
   * @summary 测试服务器连接
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PingApi
   */
  public pingGet_1(options?: any) {
    return PingApiFp(this.configuration)
      .pingGet_1(options)
      .then((request) => request(this.axios, this.basePath));
  }
}