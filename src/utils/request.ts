import axios from "axios";

// 创建一个自定义的 axios 实例
export const axiosInstance = axios.create({
  baseURL: "https://api.marisa.site", // 替换为 API 基础路径
  timeout: 1000, // 请求超时设置
  withCredentials: true,
});
