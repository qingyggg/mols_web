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
 * @interface CollectCollectActionRequest
 */
export interface CollectCollectActionRequest {
  /**
   * 文章的id
   * @type {string}
   * @memberof CollectCollectActionRequest
   */
  aHashId?: string;
  /**
   * 1-collect, 2-Uncollect
   * @type {number}
   * @memberof CollectCollectActionRequest
   */
  action_type?: number;
  /**
   *
   * @type {string}
   * @memberof CollectCollectActionRequest
   */
  tag?: string;
}
