import { get, post, put, del } from "../utils/request";

export const loginAPI = (data) => post("/api/v1/auth/manager_login", data);

/**
 * 获取商品列表
 * @param {*} params
 * @returns
 */
export const getUserAPI = (page) => get("/api/v1/admin/user", { page });

/**
 * 新增商品
 * @param {*} params
 * @returns
 */
export const addUserAPI = (params) => post("/api/v1/admin/user", params);

/**
 * 根据id修改商品
 * @param {*} id
 * @returns
 */
export const modifyUserByIdAPI = (id, data) =>
  put("/api/v1/admin/user/" + id, data);

/**
 * 根据id删除商品
 * @param {*} id
 * @returns
 */
export const delUserByIdAPI = (id) => del("/api/v1/admin/user/" + id);

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadOneByIdAPI = (id) => get("/api/v1/admin/user/" + id);
