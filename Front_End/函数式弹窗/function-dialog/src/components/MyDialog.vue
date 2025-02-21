<script setup lang="ts">
import {onMounted, ref, PropType} from 'vue'

const props = defineProps({
  title: String,
  content: String,
  cancelText: String,
  confirmText: String,
  cancelHandler: Function as PropType<() => void>,
  confirmHandler: Function as PropType<() => void>,
  close: Function as PropType<() => void>,
})
const isShow = ref<Boolean>(false)


onMounted(() => {
  isShow.value = true

})

const cancelDialogHandler = () => {
  isShow.value = false
  props.cancelHandler()
}



</script>
<template>
  <div class="main-container" v-if="isShow">
    <div>
      你好呀，这里是弹窗
    </div>
    <button @click="confirmHandler">{{ confirmText }}</button>
    <button @click="cancelDialogHandler">{{ cancelText }}</button>
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
