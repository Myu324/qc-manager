import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "./auth";

export const serverUrl = "http://localhost:1337"; //接口地址

//timeout属性很重要，当用户网络不行，请求发起之后超过这个时间还没有响应，会直接走异常处理，提示用户超时
const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000,
});

// Add a request interceptor
//全局请求拦截，发起请求之前执行
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    NProgress.start();
    config.headers.token = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
//全局响应拦截，网络请求返回之后执行
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response.data;
  },
  function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
/**
 * 发起get请求
 * @param {*} url 请求的地址
 * @param {*} params  传递的数据
 * @returns
 */
export function get(url, params) {
  return instance.get(url, {
    params, //表示url中传递的参数
  });
}
/**
 * 发起post请求
 * @param {*} url 请求的地址
 * @param {*} data  传递的数据
 * @returns
 */
export const post = (url, data) => instance.post(url, data);
/**
 * 发起put请求
 * @param {*} url 请求的地址
 * @param {*} data 传递的数据
 * @returns
 */
export const put = (url, data) => instance.put(url, data);
/**
 *  发起delete请求
 * @param {*} url
 * @returns
 */
export const del = (url) => instance.delete(url);
