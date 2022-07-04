import { get, post, put, del } from "../utils/request";

/**
 * 获取分类列表
 * @param {*} params
 * @returns
 */
export const getProductcategoryAPI = (page) =>
  get("/api/v1/admin/productcategory", { page });

/**
 * 新增分类
 * @param {*} params
 * @returns
 */
export const addProductcategoryAPI = (params) =>
  post("/api/v1/admin/productcategory", params);

/**
 * 根据id修改分类
 * @param {*} id
 * @returns
 */
export const modifyProductcategoryByIdAPI = (id, data) =>
  put("/api/v1/admin/productcategory/" + id, data);

/**
 * 根据id删除分类
 * @param {*} id
 * @returns
 */
export const delProductcategoryByIdAPI = (id) =>
  del("/api/v1/admin/productcategory/" + id);

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadOneByIdAPI = (id) =>
  get("/api/v1/admin/productcategory/" + id);
