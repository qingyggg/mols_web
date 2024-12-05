<script setup lang="ts">
import { decodeFileNameIfChinese, getFileName } from "@/utils/common";
import {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile,
  genFileId,
} from "element-plus";

const fileList = ref<UploadUserFile[]>([]);
const { fileUrl } = defineProps<{ fileUrl: string }>();
const emits = defineEmits<{ submit: [url: string] }>();
const upload = ref<UploadInstance>();
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const submitUpload = () => {
  upload.value!.submit();
};
const handleSuccess: UploadProps["onSuccess"] = (response) => {
  if (response.fileUrl) {
    emits("submit", response.fileUrl);
  }
};
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("图片的格式必须为jpg或者为png!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("图片的大小不可以超过5MB!");
    return false;
  }
  return true;
};
onMounted(() => {
  fileList.value.push({
    name: decodeFileNameIfChinese(getFileName(fileUrl)),
    url: fileUrl,
  });
});
</script>
<template>
  <el-upload
    ref="upload"
    action="https://mols.site/upload/file"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :data="{ file_type: 'imagebucket' }"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    v-model:file-list="fileList"
  >
    <template #trigger>
      <el-button type="primary">选择图片</el-button>
    </template>
    <el-button class="ml-3" type="success" @click="submitUpload">
      点击上传到服务器
    </el-button>
    <template #tip>
      <div class="el-upload__tip text-red">
        tips:只能上传一张图片，新上传的图片会覆盖掉旧的图片
      </div>
    </template>
  </el-upload>
</template>
<style lang="css" scoped></style>
