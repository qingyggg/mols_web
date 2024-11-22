import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const authenticated = ref(false);
  const uHashId = ref("");
  const logout = () => {
    authenticated.value = false;
    uHashId.value = "";
  };
  const setLoginState = (uid: string) => {
    uHashId.value = uid;
    authenticated.value = true;
  };
  return { authenticated, uHashId, logout, setLoginState };
});
