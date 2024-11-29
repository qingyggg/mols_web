<script setup lang="ts">
import { CommonArticleCard, CommonUser } from "@/apis/models";
import { ref } from "vue";
import { useRequest } from "@/hooks/useRequest";
const request = useRequest();
const pubList = ref<Array<CommonArticleCard>>([]);
const loading = ref<boolean>(false);
const noMore = ref<boolean>(false);
const uCardMap = ref<Map<string, CommonUser>>(new Map());

const publishListReq = async (offset: number) => {
  const res = await request.blogServerPublishListGet(offset);
  if (res.data.List) {
    if (res.data.List.length < 15) {
      noMore.value = true;
    }
    pubList.value.push(...res.data.List);
  } else {
    noMore.value = true;
  }
};
const userReq = (uid: string) => {
  if (uCardMap.value.get(uid)) {
    return;
  }
  request.blogServerUserGet(uid).then((res) => {
    if (res.data.user) {
      uCardMap.value.set(uid, res.data.user);
    }
  });
};
const loadMore = (offset: number) => {
  loading.value = true;
  publishListReq(offset).then(() => {
    loading.value = false;
  });
};
</script>

<template>
  <div class="bg-#f1f5f9 w-full">
    <nav-bar />
    <div class="w-full flex flex-col items-center">
      <div class="w-200">
        <publish-list
          :pubList="pubList"
          :loading="loading"
          :noMore="noMore"
          :uCardMap="uCardMap"
          @fetchList="(offset) => loadMore(offset)"
          @fetchUCard="(uid) => userReq(uid)"
        />
      </div>
    </div>
  </div>
</template>
