<script lang="ts" setup>
import { useUserStore } from "@/stores/userInfo";
import logo from "../assets/author_github.jpg";
import { useRequest } from "@/hooks/useRequest";
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const request = useRequest();
const router = useRouter();
const redToPublish = () => router.push("/publish/create");
onMounted(() => {
  if (!userStore.user) {
    request.blogServerUserGet("current").then((res) => {
      if (res.data.user) {
        userStore.setUser(res.data.user);
      }
    });
  }
});
</script>
<template>
  <template v-if="userStore.user">
    <div
      class="w-full h-15 bg-white mb-4 p-2 flex flex-row items-center justify-between"
    >
      <RouterLink to="/home">
        <div class="ml-15 flex flex-row items-center">
          <el-avatar shape="square" :size="40" :src="logo" />
          <p class="text-2xl italic ml-2">mols</p>
        </div>
      </RouterLink>
      <div class="flex flex-row gap-16 items-center">
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              创作者中心
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <p @click="redToPublish">写文章</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <RouterLink :to="/user/ + userStore.user.base.hashId">
          <div class="mr-14">
            <el-avatar
              shape="circle"
              :size="40"
              :src="userStore.user.base.profile.avatar"
            />
          </div>
        </RouterLink>
      </div>
    </div>
  </template>
  <template v-else> 正在加载用户信息。。。 </template>
</template>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
