<script setup lang="ts">
import MyDialog from "./MyDialog.vue";
import {ref} from 'vue'


const isShowDialog = ref(false)
const clickHandler = () => {
  isShowDialog.value = !isShowDialog.value
}

</script>

<template>
  <MyDialog v-model="isShowDialog"></MyDialog>
  <button @click="clickHandler">点击我</button>
</template>

<style scoped>

</style>
