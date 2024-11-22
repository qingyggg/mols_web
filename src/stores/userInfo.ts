import { ref } from "vue";
import { defineStore } from "pinia";
import type { CommonUser } from "@/apis/models";

export const useUserStore = defineStore("user", () => {
  const user = ref<CommonUser | null>();
  const setUser = (current: CommonUser) => {
    user.value = current;
  };
  const cleanUser = () => {
    user.value = null;
  };
  return { user, setUser, cleanUser };
});
