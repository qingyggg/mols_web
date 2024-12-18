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

import type { CommonUserBase } from "./common-user-base";

/**
 *
 * @export
 * @interface CommonUser
 */
export interface CommonUser {
  /**
   *
   * @type {CommonUserBase}
   * @memberof CommonUser
   */
  base?: CommonUserBase;
  /**
   * total number of people the user follows
   * @type {number}
   * @memberof CommonUser
   */
  follow_count?: number;
  /**
   * total number of fans
   * @type {number}
   * @memberof CommonUser
   */
  follower_count?: number;
  /**
   * whether the currently logged-in user follows this user
   * @type {boolean}
   * @memberof CommonUser
   */
  is_follow?: boolean;
  /**
   * number of articles for articles published by user
   * @type {number}
   * @memberof CommonUser
   */
  total_favorited?: number;
  /**
   * number of articles published by user
   * @type {number}
   * @memberof CommonUser
   */
  work_count?: number;
}
