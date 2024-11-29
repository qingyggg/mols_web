import { DefaultApiFactory } from "@/apis";
import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "@/utils/request";
import { useRouter } from "vue-router";

let isRegistered = false;
export const useRequest = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  if (isRegistered === false) {
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
        // 处理超时错误
        if (error.code === "ECONNABORTED") {
          ElMessage.error("请求超时，请稍后重试");
        }

        // 处理401错误（用户未认证）
        else if (error.response && error.response.status === 401) {
          ElMessage({
            type: "warning",
            message: error.response.data.status_msg,
            grouping: true,
          });
          router.push("/auth/login");
          authStore.logout();
        }

        // 处理其他响应错误
        else if (error.response) {
          ElMessage.error(error.response.data.status_msg || "请求错误");
        }

        // 返回错误以便组件可以捕获
        return Promise.reject(error);
      },
    );
    isRegistered = true;
  }
  return DefaultApiFactory(undefined, "https://api.marisa.site", axiosInstance);
};
