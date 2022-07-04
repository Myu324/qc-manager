import { get, post, put, del } from "../utils/request";

/**
 * 获取分类列表
 * @param {*} params
 * @returns
 */
export const getBannerCategoryAPI = (page) =>
  get("/api/v1/admin/bannercategory", { page });

/**
 * 新增分类
 * @param {*} params
 * @returns
 */
export const addBannerCategoryAPI = (params) =>
  post("/api/v1/admin/bannercategory", params);

/**
 * 根据id修改分类
 * @param {*} id
 * @returns
 */
export const modifyBannerCategoryByIdAPI = (id, data) =>
  put("/api/v1/admin/bannercategory/" + id, data);

/**
 * 根据id删除分类
 * @param {*} id
 * @returns
 */
export const delBannerCategoryByIdAPI = (id) =>
  del("/api/v1/admin/bannercategory/" + id);

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadOneByIdAPI = (id) => get("/api/v1/admin/bannercategory/" + id);
