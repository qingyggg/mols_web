<script lang="ts" setup>
const curCmt = ref<string>("<p><br/></p><p><br/></p><p><br/></p><p><br/></p>");
const cmtSendDisabled = computed(() => {
  // 去掉所有的空行和空格字符
  const current = trimHtml(curCmt.value);
  // 判断内容是否为空
  return current.length === 0;
});
const trimHtml = (html: string) => {
  // 去掉所有的空行和空格字符
  const current = html
    .replace(/<p>\s*<br\/?>\s*<\/p>/g, "") // 去除空行
    .trim(); // 去除首尾空格
  return current;
};
const emits = defineEmits<{ send: [cmt: string] }>();
const sendCmt = () => {
  emits("send", trimHtml(curCmt.value));
  curCmt.value = "<p><br/></p><p><br/></p><p><br/></p><p><br/></p>";
};
</script>
<template>
  <div class="w-full relative">
    <QuillEditor
      theme="snow"
      toolbar="minimal"
      contentType="html"
      v-model:content="curCmt"
    />
    <div class="absolute bottom-3 right-3">
      <el-button type="primary" @click="sendCmt" :disabled="cmtSendDisabled"
        >发送</el-button
      >
    </div>
  </div>
</template>
<style scoped></style>
