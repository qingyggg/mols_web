<script lang="ts" setup>
import { CommentComment, CommonUser } from "@/apis/models";
import { Orange, Comment } from "@element-plus/icons-vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const { item, uCard, isReply, articleAuthorId } = defineProps<{
  item: CommentComment;
  uCard?: CommonUser;
  isReply: boolean;
  articleAuthorId: string;
}>();
const router = useRouter();
const redUserPage = () => {
  router.push("/user/" + item.User.hashId);
};
const cmtDialogIsOpen = ref<boolean>(false);
const emits = defineEmits([
  "update:cmtFavorite",
  "fetch:userCard",
  "post:comment",
]);
const toggleCmtDiaglog = () => {
  cmtDialogIsOpen.value = !cmtDialogIsOpen.value;
};
</script>
<template>
  <div class="flex flex-row gap-3">
    <UserPopover
      :user="item.User"
      :fullUser="uCard"
      @fetch:userCard="(force: boolean) => emits('fetch:userCard', force)"
    />
    <div class="flex flex-col">
      <div class="flex" flex-row gap-2>
        <h3 @click="redUserPage" class="hover:cursor-pointer">
          <template v-if="isReply && item.User.hashId !== item.RepliedUHashId">
            user-{{ item.User.hashId.slice(0, 6) }} 回复 user-{{
              item.RepliedUHashId.slice(0, 6)
            }}
          </template>
          <template v-else> user-{{ item.User.hashId.slice(0, 6) }} </template>
        </h3>
        <template v-if="articleAuthorId === item.User.hashId">
          <el-tag type="primary">作者</el-tag>
        </template>
      </div>
      <QuillEditor
        theme="bubble"
        contentType="html"
        :content="item.Content"
        :readOnly="true"
      />
      <div class="flex flex-row gap-4">
        <p class="text-sm text-slate-400">{{ item.CreateDate }}</p>
        <div
          class="flex flex-row gap-1 items-center hover:cursor-pointer"
          @click="emits('update:cmtFavorite')"
        >
          <Orange :color="item.IsFavorite ? 'orange' : ''" class="w-4 h-4" />
          <span>{{ item.FavoriteCount }}</span>
        </div>
        <div
          class="flex flex-row gap-1 items-center hover:cursor-pointer"
          @click="toggleCmtDiaglog"
        >
          <Comment class="w-4 h-4" />
          <span style="font-size: 16px">{{
            cmtDialogIsOpen ? "取消评论" : "评论"
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-show="cmtDialogIsOpen">
    <comment-input @send="(cmt) => emits('post:comment', cmt)"></comment-input>
  </div>
</template>
<style scoped></style>
