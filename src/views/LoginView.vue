<template>
  <div class="w-full h-full flex flex-col gap-1">
    <div class="pt-5 pl-5 pb-2 mb-4 border-b-2 border-black">
      <h1 class="text-4xl">登录</h1>
    </div>
    <div class="px-7">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        label-position="left"
        size="large"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex flex-row justify-between w-full">
            <div>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                登录
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </div>
            <div>
              <el-button @click="redToRegister" type="text"
                >跳转至注册</el-button
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useRequest } from "@/hooks/useRequest";
const ruleFormRef = ref<FormInstance>();
const { setLoginState } = useAuthStore();
const request = useRequest();
const router = useRouter();
const ruleForm = reactive({
  password: "",
  username: "",
});
const redToRegister = () => {
  router.push("/auth/register");
};
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const loginReq = async () => {
  const res = await request.blogServerUserLoginPost({
    username: ruleForm.username,
    password: ruleForm.password,
  });
  if (res.data.UHashId) {
    setLoginState(res.data.UHashId);
  }
  router.replace("/home");
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loginReq();
    } else {
      ElMessage.error("表单字段有误，请重新输入");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
