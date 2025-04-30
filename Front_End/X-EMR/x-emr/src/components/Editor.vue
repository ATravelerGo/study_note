<script lang="ts" setup>

import {reactive} from 'vue'

const objectOfAttrs = reactive({
  width: '100%',
  height: '800vh',
  frameborder: 0

})

</script>

<template>
  <!-- 根据实际部署环境修改 editor.html 的路径 -->
  <iframe src="/editor.html" v-bind="objectOfAttrs"></iframe>
</template>

<style scoped>

</style>
