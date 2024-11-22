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

import type { CommonArticleBasePreload } from "./common-article-base-preload";
import type { CommonArticleInfo } from "./common-article-info";
import type { CommonUserBase } from "./common-user-base";

/**
 *
 * @export
 * @interface CommonArticleCard
 */
export interface CommonArticleCard {
  /**
   * author information
   * @type {CommonUserBase}
   * @memberof CommonArticleCard
   */
  author?: CommonUserBase;
  /**
   *
   * @type {string}
   * @memberof CommonArticleCard
   */
  hashId?: string;
  /**
   *
   * @type {number}
   * @memberof CommonArticleCard
   */
  id?: number;
  /**
   *
   * @type {CommonArticleInfo}
   * @memberof CommonArticleCard
   */
  info?: CommonArticleInfo;
  /**
   *
   * @type {CommonArticleBasePreload}
   * @memberof CommonArticleCard
   */
  pre?: CommonArticleBasePreload;
}
