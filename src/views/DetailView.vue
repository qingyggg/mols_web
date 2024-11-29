<script setup lang="ts">
import {
  CommentComment,
  CommentCommentActionRequest,
  CommonArticle,
  CommonUser,
} from "@/apis/models";
import { useRequest } from "@/hooks/useRequest";
import { useUserStore } from "@/stores/userInfo";
import {
  StarFilled,
  Star,
  Comment,
  Orange,
  View,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { aid, uid } = defineProps<{
  aid: string;
  uid: string;
}>();
const detail = ref<CommonArticle>();
const request = useRequest();
const isLoaded = ref<boolean>(false);
const cmtList = ref<Array<CommentComment>>([]);
const cmtSubMap = ref<Map<string, Array<CommentComment>>>(new Map());
const cmtSubMapRelation = ref<Map<string, boolean>>(new Map());
const cmtDrawerIsOpen = ref(false);
const uCardMap = ref<Map<string, CommonUser>>(new Map());
const userStore = useUserStore();
const openCmtDrawer = () => {
  cmtDrawerIsOpen.value = true;
};

//处理用户行为
const Afavorite = () => {
  //3,取消点赞或者踩
  //1.点赞
  const is_favorite = detail.value.info.is_favorite;
  detail.value.info.is_favorite = !is_favorite;
  if (is_favorite) {
    detail.value.info.like_count--;
  } else {
    detail.value.info.like_count++;
  }
  request
    .blogServerFavoriteActionArticlePost({
      aHashID: detail.value.hashId,
      actionType: is_favorite ? 3 : 1,
      cHashID: "",
    })
    .then(() => {
      if (is_favorite) {
        ElMessage.success("已取消点赞");
      } else {
        ElMessage.success("点赞成功");
      }
    });
};
const collect = () => {
  const is_collect = detail.value.info.is_collect;
  detail.value.info.is_collect = !is_collect;
  if (is_collect) {
    detail.value.info.collect_count--;
  } else {
    detail.value.info.collect_count++;
  }
  request
    .blogServerCollectActionPost({
      aHashId: detail.value.hashId,
      action_type: is_collect ? 2 : 1,
      tag: "default",
    })
    .then(() => {
      if (is_collect) {
        ElMessage.success("已取消收集");
      } else {
        ElMessage.success("收集成功");
      }
    });
};
const comment = (
  comment: string,
  is_reply: boolean,
  replied_id?: string,
  topCmtId?: string,
) => {
  let payload: CommentCommentActionRequest;
  if (is_reply && replied_id) {
    //回复评论
    payload = {
      aHashId: detail.value.hashId,
      content: comment,
      degree: 2,
      pHashId: replied_id,
    };
  } else {
    //顶级评论
    payload = {
      aHashId: detail.value.hashId,
      content: comment,
      degree: 1,
      pHashId: "",
    };
  }
  request.blogServerCommentActionPost(payload).then(() => {
    //刷新顶级评论和子评论
    if (is_reply === true && topCmtId) {
      //回复别人的评论
      getSubCmtList(topCmtId);
    } else {
      //顶级评论
      getTopCmtList(true);
    }
    ElMessage.success("评论成功！");
  });
};
const cmtFavorite = (item: CommentComment) => {
  let action_type: number;
  if (item.IsFavorite === true) {
    action_type = 3;
  } else {
    action_type = 1;
  }
  return request.blogServerFavoriteActionCommentPost({
    aHashID: detail.value.hashId,
    cHashID: item.CHashId,
    actionType: action_type,
  });
};
const authorFollow = () => {
  // 1-Follow, 2-Unfollow
  const is_follow = detail.value.author.is_follow;

  request
    .blogServerRelationActionPost({
      action_type: is_follow ? 2 : 1,
      to_user_id: detail.value.author.base.hashId,
    })
    .then(() => {
      detail.value.author.is_follow = !is_follow;
      if (is_follow) {
        detail.value.author.follower_count--;
      } else {
        detail.value.author.follower_count++;
      }
    });
};
//获取顶级评论
const getTopCmtList = async (needRefresh: boolean = false) => {
  const res = await request.blogServerCommentListGet(
    detail.value.hashId,
    "",
    1,
  );
  if (res.data.comment_list) {
    if (needRefresh) {
      cmtList.value = res.data.comment_list;
    } else {
      cmtList.value.push(...res.data.comment_list);
    }
  }
};
//通过顶级评论的id,获取二三级评论
const getSubCmtList = async (cid: string) => {
  const res = await request.blogServerCommentListGet(
    detail.value.hashId,
    cid,
    2,
  );
  if (res.data.comment_list) {
    cmtSubMapRelation.value.set(cid, true);
    cmtSubMap.value.set(cid, res.data.comment_list);
  }
};
//获取文章详情
const getArticleDetail = async () => {
  const res = await request.blogServerPublishDetailGet(aid, uid); //获取文章详情
  if (res.data.article) {
    detail.value = res.data.article;
  }
};
const infos = computed(() => {
  return [
    {
      count: detail.value.info.collect_count,
      icon: detail.value.info.is_collect ? StarFilled : Star,
      onClick: collect,
    },
    {
      count: detail.value.info.comment_count,
      icon: Comment,
      onClick: openCmtDrawer,
    },
    {
      count: detail.value.info.like_count,
      icon: Orange,
      color: detail.value.info.is_favorite ? "orange" : "",
      onClick: Afavorite,
    },
  ];
});

onMounted(async () => {
  await getArticleDetail(); //获取详情
  await getTopCmtList(); //获取一级评论列表
  isLoaded.value = true;
  //增加文章阅读数
  request.blogServerPublishViewAddPost({ aHashID: aid });
});

const fetchUser = (uid: string, force: boolean) => {
  if (uCardMap.value.get(uid) && !force) {
    return; //避免重复请求
  }
  request.blogServerUserGet(uid).then((res) => {
    if (res.data.user) {
      uCardMap.value.set(uid, res.data.user);
    }
  });
};
const delArticle = () => {
  if (isLoaded) {
    request.blogServerPublishActionDelete({ aHashID: aid }).then(() => {
      ElMessage.success("成功删除该文章");
      router.push("/");
    });
  }
};
const redToModPage = () => {
  if (isLoaded) {
    router.push({
      path: "/publish/modify",
      query: { aid: aid, uid: userStore.user.base.hashId },
    });
  }
};
</script>
<template>
  <div class="bg-#f1f5f9 w-full">
    <nav-bar />
    <template v-if="isLoaded">
      <div class="flex flex-row w-full min-h-screen justify-center gap-4 pt-10">
        <div class="flex flex-col gap-8 items-center m-6 mt-20">
          <template v-for="(item, idx) of infos" :key="idx">
            <el-badge
              :value="item.count"
              color="grey"
              class="scale-125"
              :offset="[-5, 3]"
              :max="99"
            >
              <el-button
                :icon="item.icon"
                size="large"
                circle
                :color="item.color"
                @click="item.onClick"
              />
            </el-badge>
          </template>
        </div>
        <div
          class="flex flex-col items-start gap-4 p-10 w-3/5 bg-white min-h-50 rounded-lg"
        >
          <h1 class="text-4xl font-bold">{{ detail.base.preload.title }}</h1>
          <div class="flex flex-row items-center gap-4">
            <router-link :to="/user/ + detail.author.base.hashId">{{
              detail.author.base.name
            }}</router-link>
            <div class="flex flex-row items-center">
              <el-icon> <View /></el-icon>&nbsp; {{ detail.info.viewed_count }}
            </div>
          </div>
          <p class="w-full bg-slate-300 rounded-md min-h-24 p-3">
            <span class="text-blue-600 italic">小记： </span
            >{{ detail.base.preload.note }}
          </p>
          <QuillEditor
            theme="bubble"
            contentType="html"
            :content="detail.base.content"
            :readOnly="true"
          />
        </div>
        <div>
          <user-card
            :user="detail.author"
            @click:follow="authorFollow"
          ></user-card>
          <template
            v-if="
              userStore.user &&
              userStore.user.base.hashId === detail.author.base.hashId
            "
          >
            <div
              class="mt-40 py-8 px-4 bg-white flex flex-col items-center gap-2 border-rounded"
            >
              <div>
                <el-button
                  type="primary"
                  plain
                  size="large"
                  @click="redToModPage"
                  >修改文章</el-button
                >
              </div>
              <div>
                <el-button type="danger" plain size="large" @click="delArticle"
                  >删除文章</el-button
                >
              </div>
            </div>
          </template>
        </div>
      </div>
      <el-drawer v-model="cmtDrawerIsOpen" direction="rtl">
        <template #header>
          <div
            class="flex flex-row justify-start items-center p-b-1 border-b-1 border-b-blueGray"
          >
            <Comment class="w-7 h-7 mr-4" />
            <span style="font-size: 25px">评论</span>
          </div>
        </template>
        <template #default>
          <div class="flex flex-col gap-4 items-start w-full">
            <comment-input @send="(cmt) => comment(cmt, false)" />
            <template v-for="(item, idx) of cmtList" :key="idx">
              <CommentItem
                :item="item"
                :uCard="uCardMap.get(item.User.hashId)"
                :isReply="false"
                :articleAuthorId="detail.author.base.hashId"
                @fetch:userCard="
                  (force: boolean) => fetchUser(item.User.hashId, force)
                "
                @post:comment="
                  (cmt) => {
                    comment(cmt, true, item.CHashId, item.CHashId);
                    cmtList[idx].ChildNum++;
                  }
                "
                @update:cmtFavorite="
                  () => {
                    cmtFavorite(item).then(() => {
                      if (cmtList[idx].IsFavorite) {
                        cmtList[idx].FavoriteCount--;
                      } else {
                        cmtList[idx].FavoriteCount++;
                      }
                      cmtList[idx].IsFavorite = !cmtList[idx].IsFavorite;
                    });
                  }
                "
              />

              <template v-if="item.ChildNum > 0">
                <template v-if="cmtSubMapRelation.get(item.CHashId)">
                  <template
                    v-for="(subItem, idx2) of cmtSubMap.get(item.CHashId)"
                    :key="idx2"
                  >
                    <div class="ml-5">
                      <CommentItem
                        :item="subItem"
                        :uCard="uCardMap.get(subItem.User.hashId)"
                        :isReply="true"
                        :articleAuthorId="detail.author.base.hashId"
                        @fetch:userCard="
                          (force: boolean) =>
                            fetchUser(subItem.User.hashId, force)
                        "
                        @post:comment="
                          (cmt) =>
                            comment(cmt, true, subItem.CHashId, item.CHashId)
                        "
                        @update:cmtFavorite="
                          () => {
                            cmtFavorite(subItem).then(() => {
                              if (
                                cmtSubMap.get(item.CHashId)[idx2].IsFavorite
                              ) {
                                cmtSubMap.get(item.CHashId)[idx2]
                                  .FavoriteCount--;
                              } else {
                                cmtSubMap.get(item.CHashId)[idx2]
                                  .FavoriteCount++;
                              }
                              cmtSubMap.get(item.CHashId)[idx2].IsFavorite =
                                !cmtSubMap.get(item.CHashId)[idx2].IsFavorite;
                            });
                          }
                        "
                      />
                    </div>
                  </template>
                </template>
                <template v-else>
                  <p
                    class="hover:cursor-pointer ml-5"
                    @click="getSubCmtList(item.CHashId)"
                  >
                    查看{{ item.ChildNum }}条回复
                  </p>
                </template>
              </template>
            </template>
          </div>
        </template>
      </el-drawer>
    </template>
    <template v-else>
      <p>正在加载中。。。。</p>
    </template>
  </div>
</template>
<style scoped>
.el-drawer__header {
  margin-bottom: 0;
}
.el-button {
  margin-left: 0px;
}
</style>
