<script setup lang="ts">
import { reactive, ref } from "vue";

import EditOrAddUserDialog from "./EditOrAddUserDialog.vue";

const formHead = reactive({
  name: "",
});
const editOrAddUserDialogRef = ref();
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const handleSizeChange = () => {};

const handleCurrentChange = () => {};

const addOrEditUser = (title: string) => {
  editOrAddUserDialogRef.value.openUserFormDialog(title);
};
</script>

<template>
  <div class="user-container">
    <header class="user__header">
      <div class="user__header__top">
        <span>用户管理</span>
      </div>
      <div class="user__header__middle">
        <div class="user__header__middle__left">
          <el-form inline :model="formHead" label-width="auto">
            <el-form-item label="登录名称">
              <el-input v-model="formHead.name" />
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="formHead.name" />
            </el-form-item>
            <el-form-item label="用户状态">
              <el-input v-model="formHead.name" />
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="formHead.name" />
            </el-form-item>
          </el-form>
        </div>
        <div class="user__header__middle__right">
          <el-button type="primary">筛选</el-button>
          <el-button link> 清空已选 </el-button>
        </div>
      </div>
      <div class="user__header__bottom">
        <el-button type="primary" @click="addOrEditUser('新增用户')"
          >新建</el-button
        >
        <el-button type="primary">批量删除</el-button>
      </div>
    </header>

    <main class="user__main">
      <el-table :data="tableData" height="70vh" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="登录名称" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="部门" />
        <el-table-column prop="address" label="手机号码" />
        <el-table-column prop="address" label="用户状态" />
        <el-table-column prop="address" label="创建时间" />
        <el-table-column prop="address" label="操作" width="150">
          <template #default="scope">
            <el-button link> 修改 </el-button>
            <el-button link> 重置 </el-button>
            <el-button link> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-block">
        <div class="demonstration">共XXX</div>
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </main>

    <EditOrAddUserDialog ref="editOrAddUserDialogRef"></EditOrAddUserDialog>
  </div>
</template>

<style scoped lang="scss">
.user-container {
  //background-color: #0e1c1a;
  .user__header {
    &__top {
      padding: 5px;
      color: #86d6d0;
    }
    &__middle {
      color: white;
      display: flex;

      &__left {
        width: 85%;
        border-right: 1px solid #3a4a45;
      }
      &__right {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 15px;
      }
    }
    &__bottom {
    }
  }

  .user__main {
    .pagination-block {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}

:deep(.el-form-item__label) {
  //color: white;
}
</style>
