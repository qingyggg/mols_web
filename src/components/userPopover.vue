<script lang="ts" setup>
import { CommonUser, CommonUserBase } from "@/apis/models";
import { useRouter } from "vue-router";

const router = useRouter();
const { user, fullUser } = defineProps<{
  user: CommonUserBase;
  fullUser?: CommonUser;
}>();
const redUserPage = () => {
  router.push("/user/" + user.hashId);
};
const emits = defineEmits(["fetch:userCard"]);
</script>
<template>
  <el-popover
    placement="left"
    :width="240"
    trigger="hover"
    @show="emits('fetch:userCard')"
  >
    <template #reference>
      <div @click="redUserPage" class="hover:cursor-pointer">
        <el-avatar :size="'small'" :src="user.profile.avatar" />
      </div>
    </template>
    <template #default>
      <template v-if="fullUser">
        <UserCard :user="fullUser" />
      </template>
      <template v-else>正在加载用户信息。。。</template>
    </template>
  </el-popover>
</template>
<style scoped></style>
