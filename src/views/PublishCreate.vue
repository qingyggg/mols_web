<script setup lang="ts">
import { useRequest } from "@/hooks/useRequest";
import { ref } from "vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const upload = ref<UploadInstance>();
const content = ref<string>("");
const pubForm = ref<{
  title: string;
  note: string;
  cover_url: string;
}>({ title: "", note: "", cover_url: "" });
const formLabelWidth = "140px";
const request = useRequest();

const dialogFormVisible = ref(false);
const openDialog = () => {
  dialogFormVisible.value = true;
};
const closeDialog = () => {
  dialogFormVisible.value = false;
};
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  if (response.fileUrl) {
    pubForm.value.cover_url = response.fileUrl;
  }
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("背景图片的格式必须为jpg或者为png!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("背景图片的大小不可以超过5MB!");
    return false;
  }
  return true;
};

const publish = () => {
  closeDialog();
  request
    .blogServerPublishActionPost({
      payload: {
        preload: {
          title: pubForm.value.title,
          note: pubForm.value.note,
          cover_url: pubForm.value.cover_url,
        },
        content: content.value,
      },
    })
    .then(() => {
      router.push("/home");
    });
};
</script>
<template>
  <div class="flex flex-row w-full">
    <div class="w-70% h-100vh">
      <QuillEditor
        theme="snow"
        toolbar="full"
        v-model:content="content"
        contentType="html"
      />
    </div>
    <div class="p-10">
      <el-button type="primary" plain @click="openDialog">发布文章</el-button>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="文章发布对话框" width="500">
    <el-form :model="pubForm">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="pubForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="小记" :label-width="formLabelWidth">
        <el-input v-model="pubForm.note" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传背景图片" :label-width="formLabelWidth">
        <el-upload
          ref="upload"
          action="https://mols.site/upload/file"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :data="{ file_type: 'imagebucket' }"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
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
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="publish">点击发布</el-button>
      <el-button type="primary" @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>
<style></style>
