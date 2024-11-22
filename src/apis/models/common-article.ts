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

import type { CommonArticleBase } from "./common-article-base";
import type { CommonArticleInfo } from "./common-article-info";
import type { CommonUser } from "./common-user";

/**
 *
 * @export
 * @interface CommonArticle
 */
export interface CommonArticle {
  /**
   * author information
   * @type {CommonUser}
   * @memberof CommonArticle
   */
  author?: CommonUser;
  /**
   *
   * @type {CommonArticleBase}
   * @memberof CommonArticle
   */
  base?: CommonArticleBase;
  /**
   *
   * @type {string}
   * @memberof CommonArticle
   */
  hashId?: string;
  /**
   * video id
   * @type {number}
   * @memberof CommonArticle
   */
  id?: number;
  /**
   *
   * @type {CommonArticleInfo}
   * @memberof CommonArticle
   */
  info?: CommonArticleInfo;
}
