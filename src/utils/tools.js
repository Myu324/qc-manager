import { serverUrl } from "./request";

/**
 * 服务器端文件上传接口的地址
 */
export const uploadFileUrl = serverUrl + "/api/v1/common/upload_file";
/**
 * 处理图片地址
 * @param {*} url
 * @returns
 */
export function dalImg(url) {
  if (url) {
    if (url.startsWith("http")) {
      return url;
    }
    return serverUrl + url;
  }
  return "https://img1.baidu.com/it/u=769322981,2575801665&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
}
