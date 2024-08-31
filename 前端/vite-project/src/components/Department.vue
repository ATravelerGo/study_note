<script setup lang="ts">
import { Guide, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";

interface Tree {
  label: string;
  children?: Tree[];
}
const departmentData = ref([
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
]);

const defaultProps = {
  children: "children",
  label: "label",
};

const handleNodeClick = (data: Tree) => {
  console.log(data);
};
</script>

<template>
  <div>
    <header class="department__header">
      <div>
        <el-icon><Guide /></el-icon>
        <span>部门管理</span>
      </div>
      <div>
        <el-icon><Edit /></el-icon>

        <span>编辑</span>
      </div>
    </header>
    <main class="department__main">
      <el-tree
        style="max-width: 600px"
        :data="departmentData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
.department__header {
  display: flex;
  justify-content: space-between;
  background-color: #234b49;
  color: white;
  padding: 5px;
  & > div {
    display: flex;
    cursor: pointer;
    align-items: center;
  }
}
</style>
