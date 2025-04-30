<script setup lang="ts">
import Editor from "./Editor.vue";
import { ref } from 'vue'

defineProps<{ msg: string }>()


const editor = ref(null)

//加载编辑器
const onLoad = (e:Event) => {
  editor.value =  e.target?.contentWindow.editor
}

//处理文档命令
const execCommand = (cmd) => {
  editor.execCommand(cmd)
}
</script>

<template>

  <div style="width: 100%;height: 100%">
<!--  <Editor doc="https://www.x-emr.cn/doc/999.html" @load="onLoad" style="margin: 10px 0;" mode="design"/>-->
    <Editor doc="/blank.html" @load="onLoad" style="margin: 10px 0;" mode="design"/>

  </div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
