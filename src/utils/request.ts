import axios from "axios";

// 创建一个自定义的 axios 实例
export const axiosInstance = axios.create({
  baseURL:"https://mols.site/blog_server", // 替换为 API 基础路径
  timeout: 1000, // 请求超时设置
  withCredentials: true,
});
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response, // 正常响应直接返回
  (error) => {
    // 返回错误以便组件可以捕获
    return Promise.reject(error);
  },
);
