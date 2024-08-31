<script setup lang="ts">
import Department from "./components/Department.vue";
import User from "./components/User.vue";
</script>

<template>
  <div class="main">
    <Department class="department"></Department>
    <User class="user"></User>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;

  .department {
    width: 20%;
  }
  .user {
    flex: 1;
  }
}
</style>
