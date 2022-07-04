import { get, post, put, del } from "../utils/request";

/**
 * 获取轮播图列表
 * @param {*} params
 * @returns
 */
export const getBannerAPI = (page) => get("/api/v1/admin/banner", { page });

/**
 * 新增轮播图
 * @param {*} params
 * @returns
 */
export const addBannerAPI = (params) => post("/api/v1/admin/banner", params);

/**
 * 根据id修改轮播图
 * @param {*} id
 * @returns
 */
export const modifyBannerByIdAPI = (id, data) =>
  put("/api/v1/admin/banner/" + id, data);

/**
 * 根据id删除轮播图
 * @param {*} id
 * @returns
 */
export const delBannerByIdAPI = (id) => del("/api/v1/admin/banner/" + id);

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadOneByIdAPI = (id) => get("/api/v1/admin/banner/" + id);
