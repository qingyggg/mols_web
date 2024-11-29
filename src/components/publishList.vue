<script lang="ts" setup>
import { CommonArticleCard, CommonUser } from "@/apis/models";
import {
  StarFilled,
  Star,
  Comment,
  Orange,
  View,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const { noMore, pubList, uCardMap, loading } = defineProps<{
  noMore: boolean;
  pubList: Array<CommonArticleCard>;
  uCardMap: Map<string, CommonUser>;
  loading: boolean;
}>();
let offset = 0;
const emits = defineEmits<{
  fetchList: [offset: number];
  fetchUCard: [uid: string];
}>();
const router = useRouter();
const loadMore = () => {
  if (loading) {
    return; //避免重复请求
  }
  emits("fetchList", offset);
  offset += 15;
};
const detailRed = (aid: string, uid: string) => {
  router.push({ path: "/detail", query: { aid, uid } });
};
</script>
<template>
  <ul
    v-infinite-scroll="loadMore"
    infinite-scroll-delay="1000"
    :infinite-scroll-disabled="noMore"
    class="list-none h-200 overflow-y-auto rounded-md w-full"
  >
    <li v-for="(item, index) in pubList" :key="index" class="w-full">
      <div class="w-full py-3 px-3 bg-white">
        <div class="flex flex-row justify-between items-center px-2">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-3">
              <UserPopover
                :user="item.author"
                :fullUser="uCardMap.get(item.author.hashId)"
                @fetch:userCard="emits('fetchUCard', item.author.hashId)"
              />
              {{ item.author.name }}
            </div>
            <h1
              class="text-2xl font-medium hover:decoration-dotted hover:underline hover:cursor-pointer"
              @click="detailRed(item.hashId, item.author.hashId)"
            >
              {{ item.pre.title }}
            </h1>
            <p
              @click="detailRed(item.hashId, item.author.hashId)"
              class="hover:decoration-dotted hover:underline hover:cursor-pointer"
            >
              {{ item.pre.note }}
            </p>
            <div class="flex flex-row gap-3">
              <div>
                <el-icon>
                  <template v-if="item.info.is_collect">
                    <StarFilled />
                  </template>
                  <template v-else>
                    <Star />
                  </template>
                </el-icon>
                {{ item.info.collect_count }}
              </div>
              <div>
                <el-icon>
                  <el-icon><Comment /></el-icon
                ></el-icon>
                {{ item.info.comment_count }}
              </div>
              <div>
                <el-icon> <View /></el-icon> {{ item.info.viewed_count }}
              </div>
              <div>
                <el-icon :color="item.info.is_favorite ? 'orange' : ''"
                  ><Orange
                /></el-icon>
                {{ item.info.like_count }}
              </div>
            </div>
          </div>
          <div class="mx-1">
            <el-image
              style="width: 100px; height: 100px"
              :src="item.pre.cover_url"
              fit="cover"
            />
          </div>
        </div>
        <div class="border-t-1 border-slate-300 w-full mt-2"></div>
      </div>
    </li>
    <li v-if="noMore" class="px-3">没有更多了。。。</li>
  </ul>
</template>
<style scoped></style>
