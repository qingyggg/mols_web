<script lang="ts" setup>
import { CommonUser } from "@/apis/models";
import { useRequest } from "@/hooks/useRequest";
import { TabsPaneContext } from "element-plus";
import { useRouter } from "vue-router";

const { uid } = defineProps<{ uid: string }>();
const user = ref<CommonUser>();
const activeName = ref<string>('publish');
const request = useRequest();
const router=useRouter()
onMounted(() => {
  request.blogServerUserGet(uid).then((res) => {
    if (res.data.user) {
      user.value = res.data.user;
    }
  });
});
const handleClick = (tab: TabsPaneContext,a) => {
  // router.push(tab.paneName)
  console.log(tab.paneName)
};
</script>
<template>
  <div class="bg-#f1f5f9 w-full">
    <nav-bar />
    <div class="flex flex-col w-full items-center" v-if="user">
      <div class="w-45% min-h-100vh flex flex-col items-center gap-4 bg-white">
        <el-image
          style="width: 100%; height: 300px"
          :src="user.base.profile.background_image"
          fit="cover"
        />
        <div class="w-full p-4 flex flex-col">
          <div class="w-full flex flex-row justify-end relative">
            <el-button type="primary">编辑个人资料</el-button>
            <el-avatar
              :size="150"
              :src="user.base.profile.avatar"
              class="absolute top-[-8em] left-2"
            />
          </div>
          <div class="flex flex-col gap-3 mt-6">
            <div>
              <h1 class="bold text-2xl">{{ user.base.name }}</h1>
              <p class="text-slate-400 font-light">@{{ user.base.hashId }}</p>
            </div>
            <div class="flex flex-row gap-6">
              <p>
                <span class="font-bold">{{ user.follow_count }}</span> 正在关注
              </p>
              <p>
                <span class="font-bold">{{ user.follower_count }}</span> 关注者
              </p>
            </div>
          </div>
        </div>
        <div class="w-full p-4">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            :stretch="true"
          >
            <el-tab-pane label="文章" name="published_list"/>
            <el-tab-pane label="收藏" name="published_list"/>
            <el-tab-pane label="关注" name="following_list"/>
            <el-tab-pane label="关注者" name="follower_list"/>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
