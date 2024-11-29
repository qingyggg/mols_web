<template>
  <div class="w-full h-full flex flex-col gap-1">
    <div class="pt-5 pl-5 pb-2 mb-4 border-b-2 border-black">
      <h1 class="text-4xl">注册</h1>
    </div>
    <div class="px-7">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
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
        <el-form-item label="确认密码" prop="password">
          <el-input
            v-model="ruleForm.confirmPwd"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex flex-row justify-between w-full">
            <div>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                注册
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </div>
            <div>
              <el-button @click="redToLogin()" type="text"
                >跳转至登录</el-button
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
const router = useRouter();
const request = useRequest();
const ruleForm = reactive({
  password: "",
  username: "",
  confirmPwd: "",
});
const redToLogin = () => {
  router.push("/auth/login");
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
  confirmPwd: [
    {
      required: true,
      message: "请输入确认密码",
      trigger: "blur",
    },
  ],
});
const loginReq = async () => {
  if (ruleForm.password != ruleForm.confirmPwd) {
    ElMessage({ type: "warning", message: "密码不一致，请重新输入" });
    return;
  }
  const res = await request.blogServerUserRegisterPost({
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
