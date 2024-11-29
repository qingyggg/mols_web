<script lang="ts" setup>
import { CommonUser } from "@/apis/models";
import { useRouter } from "vue-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { user } = defineProps<{ user: CommonUser }>();
const emit = defineEmits(["click:follow"]);
const router=useRouter()
const uInfos = computed(() => {
  return [
    { title: "文章", count: user.work_count },
    { title: "点赞数", count: user.total_favorited },
    { title: "粉丝数", count: user.follower_count },
  ];
});
const redToUserPage=()=>{
  router.push("/user/"+user.base.hashId)
}
</script>

<template>
  <div
    class="flex flex-col items-center gap-4 p-5 bg-white min-w-60 max-h-60 max-w-80 rounded-lg"
  >
    <div class="flex flex-row items-center gap-4 justify-start w-full hover:cursor-pointer" @click="redToUserPage">
      <el-avatar :size="'large'" :src="user.base.profile.avatar" />
      <p class="hover:underline underline-offset-2">{{ user.base.name }}</p>
    </div>
    <div class="flex flex-row items-center">
      <template v-for="(item, idx) of uInfos" :key="idx">
        <div class="flex flex-col items-center px-3">
          <p>{{ item.count }}</p>
          <p class="text-slate-400">{{ item.title }}</p>
        </div>
      </template>
    </div>
    <div>
      <el-button type="primary" plain @click="emit('click:follow')" size="large"
        >&nbsp;&nbsp;{{
          user.is_follow ? "已关注" : "关注"
        }}&nbsp;&nbsp;</el-button
      >
    </div>
  </div>
</template>
<style lang="css" scoped></style>
