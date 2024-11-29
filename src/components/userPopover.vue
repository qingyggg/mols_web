<script lang="ts" setup>
import { CommonUser, CommonUserBase } from "@/apis/models";
import { useRequest } from "@/hooks/useRequest";
import { useRouter } from "vue-router";

const router = useRouter();
const request = useRequest();
const {
  user,
  fullUser,
  avatarSize = "small",
} = defineProps<{
  user: CommonUserBase;
  fullUser?: CommonUser;
  avatarSize?: "small" | "default" | "large";
}>();
const redUserPage = () => {
  router.push("/user/" + user.hashId);
};
const emits = defineEmits(["fetch:userCard"]);
const follow = () => {
  request
    .blogServerRelationActionPost({
      to_user_id: user.hashId,
      action_type: fullUser.is_follow ? 2 : 1,
    })
    .then(() => {
      emits("fetch:userCard", true);
    });
};
</script>
<template>
  <el-popover
    placement="left"
    :width="240"
    trigger="hover"
    @show="emits('fetch:userCard', false)"
  >
    <template #reference>
      <div @click="redUserPage" class="hover:cursor-pointer">
        <el-avatar :size="avatarSize" :src="user.profile.avatar" />
      </div>
    </template>
    <template #default>
      <template v-if="fullUser">
        <UserCard :user="fullUser" @click:follow="follow" />
      </template>
      <template v-else>正在加载用户信息。。。</template>
    </template>
  </el-popover>
</template>
<style scoped></style>
