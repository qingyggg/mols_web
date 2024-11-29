<script setup lang="ts">
import { useRequest } from "@/hooks/useRequest";
import { useUserStore } from "@/stores/userInfo";
import { ref } from "vue";

const Form = ref<{
  avatar: string;
  backgroundImg: string;
  signature: string;
}>({ avatar: "", backgroundImg: "", signature: "" });
const formLabelWidth = "140px";
const request = useRequest();
const userStore = useUserStore();
const loaded = ref<boolean>(false);
onMounted(() => {
  const profile = userStore.user.base.profile;
  Form.value.avatar = profile.avatar;
  Form.value.backgroundImg = profile.background_image;
  Form.value.signature = profile.signature;
  loaded.value = true;
});
const submitForm = () => {
  request
    .blogServerUserProfileModifyPost({
      user_profile: {
        avatar: Form.value.avatar,
        background_image: Form.value.backgroundImg,
        signature: Form.value.signature,
      },
    })
    .then(() => {
      ElMessage({ type: "success", message: "用户资料修改成功" });
    });
};
</script>
<template>
  <div>
    <template v-if="loaded">
      <el-form :model="Form">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input
            v-model="Form.signature"
            autocomplete="off"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="头像上传" :label-width="formLabelWidth">
          <img-upload
            @submit="
              (url) => {
                console.log(url);
                Form.avatar = url;
              }
            "
            :file-url="Form.avatar"
          />
        </el-form-item>
        <el-form-item label="背景图片上传" :label-width="formLabelWidth">
          <img-upload
            @submit="(url) => (Form.backgroundImg = url)"
            :file-url="Form.backgroundImg"
          />
        </el-form-item>
        <el-form-item label="点击提交" :label-width="formLabelWidth">
          <div>
            <el-button type="primary" @click="submitForm()">
              修改资料
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>
<style lang="css" scoped></style>
