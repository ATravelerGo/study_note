<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";

const handleClose = () => {
  dialog.dialogVisible = false;
};

const dialog = reactive({
  dialogVisible: false,
  title: "新增用户",
});

defineExpose({
  openUserFormDialog: (title: string) => {
    console.log("title:", title);
    dialog.dialogVisible = true;
    dialog.title = title;
  },
});
const form = reactive({
  name: "",
  address: "",
  phone: "",
  status: "",
});
const formRef = ref();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入必填项", trigger: "blur" }],
  address: [{ required: true, message: "请输入必填项", trigger: "blur" }],
  phone: [{ required: true, message: "请输入必填项", trigger: "blur" }],
  status: [{ required: true, message: "请输入必填项", trigger: "blur" }],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <el-dialog
    v-model="dialog.dialogVisible"
    :title="dialog.title"
    width="500"
    :before-close="handleClose"
  >
    <el-form :rules="rules" ref="formRef" :model="form" label-width="auto">
      <el-form-item label="登录名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-input v-model="form.status" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
