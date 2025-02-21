<script setup lang="ts">
import {$Dialog} from './DialogHandle.ts'


const clickHandler = () => {
  $Dialog("标题", '内容', "取消", '确认'
  ).then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err)
  })
}

</script>

<template>
  <button @click="clickHandler">点击我</button>
</template>

<style scoped>

</style>
