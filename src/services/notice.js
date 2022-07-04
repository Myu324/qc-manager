import { get, post, put, del } from "../utils/request";

/**
 * 获取公告列表
 * @param {*} params
 * @returns
 */
export const getNoticeAPI = (page) => get("/api/v1/admin/notice", { page });

/**
 * 新增公告
 * @param {*} params
 * @returns
 */
export const addNoticeAPI = (params) => post("/api/v1/admin/notice", params);

/**
 * 根据id修改公告
 * @param {*} id
 * @returns
 */
export const modifyNoticeByIdAPI = (id, data) =>
  put("/api/v1/admin/notice/" + id, data);

/**
 * 根据id删除公告
 * @param {*} id
 * @returns
 */
export const delNoticeByIdAPI = (id) => del("/api/v1/admin/notice/" + id);

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadOneByIdAPI = (id) => get("/api/v1/admin/notice/" + id);
