<script setup lang="ts">

import {useVModel} from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: String,
  content: String
})

const emit = defineEmits(['update:modelValue'])
const isShow = useVModel(props, 'modelValue', emit)

const closeHandler = () => {
  isShow.value = false
}


</script>
<template>
  <div class="main-container" v-if="isShow">
    <div>
      你好呀，这里是弹窗
    </div>
    <button @click="closeHandler">点击我在内部关闭</button>
    <div>
      这里是父组件传过来的title:{{ title }}
    </div>
    <div>这里是父组件传过来的content：{{ content }}</div>
  </div>
</template>
<style scoped>
.main-container {
  width: 100%;
  border: 5px solid red;
}

</style>
