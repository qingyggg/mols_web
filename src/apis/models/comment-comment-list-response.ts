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

import type { CommentComment } from "./comment-comment";

/**
 *
 * @export
 * @interface CommentCommentListResponse
 */
export interface CommentCommentListResponse {
  /**
   * return comment list
   * @type {Array<CommentComment>}
   * @memberof CommentCommentListResponse
   */
  comment_list?: Array<CommentComment>;
  /**
   * 0-success, other values-failure
   * @type {number}
   * @memberof CommentCommentListResponse
   */
  status_code?: number;
  /**
   *
   * @type {string}
   * @memberof CommentCommentListResponse
   */
  status_msg?: string;
}