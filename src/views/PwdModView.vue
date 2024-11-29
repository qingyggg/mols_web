<template>
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
        <el-input disabled type="text" :placeholder="user.base.name" />
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="ruleForm.oldPassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="password">
        <el-input
          v-model="ruleForm.confirmPwd"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="点击修改">
        <div>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            修改
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useRequest } from "@/hooks/useRequest";
import { useUserStore } from "@/stores/userInfo";
const ruleFormRef = ref<FormInstance>();
const { user } = useUserStore();
const request = useRequest();
const ruleForm = reactive({
  oldPassword: "",
  password: "",
  confirmPwd: "",
});
const rules = reactive<FormRules<typeof ruleForm>>({
  oldPassword: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
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
const pwdModReq = async () => {
  if (ruleForm.password != ruleForm.confirmPwd) {
    ElMessage({ type: "warning", message: "密码不一致，请重新输入" });
    return;
  }
  await request.blogServerUserPwdModifyPost({
    username: user.base.name,
    old_password: ruleForm.oldPassword,
    new_password: ruleForm.password,
  }).then(()=>{
    ElMessage.success("修改密码成功")
    resetForm(ruleFormRef.value)
  })

};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      pwdModReq();
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
