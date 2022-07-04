import { get, post, put, del } from "../utils/request";

/**
 * 获取商品列表
 * @param {*} params
 * @returns
 */
export const getProductAPI = (page) => get("/api/v1/admin/product", { page });

/**
 * 新增商品
 * @param {*} params
 * @returns
 */
export const addProductAPI = (params) => post("/api/v1/admin/product", params);

/**
 * 根据id修改商品
 * @param {*} id
 * @returns
 */
export const modifyProductByIdAPI = (id, data) =>
  put("/api/v1/admin/product/" + id, data);

/**
 * 根据id删除商品
 * @param {*} id
 * @returns
 */
export const delProductByIdAPI = (id) => del("/api/v1/admin/product/" + id);

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadOneByIdAPI = (id) => get("/api/v1/admin/product/" + id);
