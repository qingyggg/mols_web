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
 * @interface UserUserActionResponse
 */
export interface UserUserActionResponse {
  /**
   *
   * @type {string}
   * @memberof UserUserActionResponse
   */
  UHashId?: string;
  /**
   * user id
   * @type {number}
   * @memberof UserUserActionResponse
   */
  UserId?: number;
  /**
   *
   * @type {number}
   * @memberof UserUserActionResponse
   */
  status_code?: number;
  /**
   *
   * @type {string}
   * @memberof UserUserActionResponse
   */
  status_msg?: string;
}