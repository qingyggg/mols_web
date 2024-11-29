<script lang="ts" setup>
import { CommonUser } from "@/apis/models";
import { useRequest } from "@/hooks/useRequest";
import { useRoute, useRouter } from "vue-router";

const list = ref<Array<CommonUser>>([]);
const { viewProp } = defineProps<{
  viewProp: { uid: string; user: CommonUser };
}>();
const request = useRequest();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  if (route.meta.type === "follower") {
    request.blogServerRelationFollowerListGet(viewProp.uid).then((res) => {
      if (res.data.user_list) {
        list.value = res.data.user_list;
      }
    });
  } else {
    request.blogServerRelationFollowListGet(viewProp.uid).then((res) => {
      if (res.data.user_list) {
        list.value = res.data.user_list;
      }
    });
  }
});
const redToUserPage = (uid) => {
  // console.log("User ID:", uid); // 输出用户 ID
  // 实现跳转逻辑
  router.push("/user/" + uid);
};

const handleClick = (event) => {
  // 查找点击的元素最近的带有 data-user-id 属性的元素
  const userId = event.target.closest("[data-user-id]")?.dataset.userId;
  if (userId) {
    redToUserPage(userId);
  }
};
</script>
<template>
  <ul class="w-full flex flex-col h-100vh" @click="handleClick">
    <template v-for="(item, idx) of list" :key="idx">
      <li
        class="w-full px-3 hover:bg-#f1f5f9"
        :data-user-id="item.base.hashId"
        hover:cursor-pointer
      >
        <div class="w-full flex flex-row px-3 py-3 gap-4 border-b-1">
          <div>
            <UserPopover
              :user="item.base"
              :full-user="item"
              avatar-size="default"
              @fetch:user-card="
                (force: boolean) => {
                  if (force) {
                    list[idx].is_follow = !list[idx].is_follow;
                  }
                }
              "
            />
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-bold decoration-solid hover:underline decoration-1">
              {{ item.base.name }}
            </p>
            <p class="font-light text-slate-400">
              @{{ item.base.hashId.slice(0, 6) }}
            </p>
            <p>{{ item.base.profile.signature }}</p>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>
<style lang="css" scoped></style>
