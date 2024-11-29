<script setup lang="ts">
import { useUserStore } from "@/stores/userInfo";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route=useRoute()
const userStore = useUserStore();
const pageChange = (name: string) => {
  if (name === "pwd") {
    router.push("/setting/pwd_modify");
  } else {
    router.push("/setting/profile_modify");
  }
};
const activeName = ref<"pwd" | "profile">()
watch(()=>route.fullPath,(newPath:string)=>{
  if (newPath.includes("pwd_modify")) {
    activeName.value="pwd"
  } else if (newPath.includes("profile_modify")) {
    activeName.value="profile"
  } else {
    activeName.value="profile"
  }
},  { immediate: true })
</script>
<template>
  <div class="bg-#f1f5f9 w-full">
    <nav-bar />
    <div class="w-full flex flex-col items-center" v-if="userStore.user">
      <div class="w-[70%] h-100vh bg-white rounded-md p-8 flex flex-row">
        <el-tabs
          :tab-position="'left'"
          :model-value="activeName"
          style="height: 100%"
          @tab-change="(name) => pageChange(name as string)"
        >
          <el-tab-pane label="密码修改" name="pwd"></el-tab-pane>
          <el-tab-pane label="用户资料修改" name="profile"></el-tab-pane>
        </el-tabs>
        <div class="w-[80%]">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
