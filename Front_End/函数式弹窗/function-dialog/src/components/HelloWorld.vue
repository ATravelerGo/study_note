<script setup lang="ts">
import MyDialog from "./MyDialog.vue";
import {ref} from 'vue'

defineProps<{ msg: string }>()

const isShowDialog = ref(false)
const clickHandler = () => {
  isShowDialog.value = !isShowDialog.value
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <MyDialog v-model="isShowDialog"></MyDialog>

  <button @click="clickHandler">点击我</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
