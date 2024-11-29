<script lang="ts" setup>
import { CommonArticleCard, CommonUser } from "@/apis/models";
import { useRequest } from "@/hooks/useRequest";

const { viewProp } = defineProps<{
  viewProp: { uid: string; user: CommonUser };
}>();
const request = useRequest();
const pubList = ref<Array<CommonArticleCard>>([]);
const loading = ref<boolean>(false);
const noMore = ref<boolean>(false);
const uCardMap = ref<Map<string, CommonUser>>(new Map());
const publishListReq = async (offset: number) => {
  const res = await request.blogServerPublishListGet(offset, viewProp.uid);
  if (res.data.List) {
    if (res.data.List.length < 15) {
      noMore.value = true;
    }
    pubList.value.push(...res.data.List);
  } else {
    noMore.value = true;
  }
};
const loadMore = (offset: number) => {
  loading.value = true;
  publishListReq(offset).then(() => {
    loading.value = false;
  });
};
onMounted(() => {
  uCardMap.value.set(viewProp.uid, viewProp.user);
});
</script>
<template>
  <div class="w-full flex flex-col items-center">
    <publish-list
      :pubList="pubList"
      :loading="loading"
      :noMore="noMore"
      :uCardMap="uCardMap"
      @fetchList="(offset) => loadMore(offset)"
      @fetchUCard="() => void 0"
    />
  </div>
</template>
<style lang="css" scoped></style>
