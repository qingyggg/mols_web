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

/**
 *
 * @export
 * @interface CommonBaseResponse
 */
export interface CommonBaseResponse {
  /**
   * status code, 0-success, other values-failure
   * @type {number}
   * @memberof CommonBaseResponse
   */
  status_code?: number;
  /**
   * status description
   * @type {string}
   * @memberof CommonBaseResponse
   */
  status_msg?: string;
}