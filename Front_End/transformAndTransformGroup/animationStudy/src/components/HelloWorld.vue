<script setup lang="ts">
import {ref} from 'vue'
import  {shuffle } from 'lodash-es'
defineProps<{ msg: string }>()

const isTransition=ref<boolean>(false)

const changeIsTransition=()=>{

  isTransition.value=!isTransition.value

}

const list=ref([{
  title:"A transition-group element",
  index:0
},
  {
    title:"A transition-group element",
    index:1
  },
  {
    title:"A transition-group element",
    index:2
  },
  {
    title:"A transition-group element",
    index:3
  },
])

const addTransitionGroupElement=()=>{
  list.value.push({title:"A transition-group element",index:list.value.length})
}
const subTransitionGroupElement=()=>{
  list.value.pop()

}

const changeTransitionGroupElement = () => {
  const item = list.value.pop(); // 删除最后一个元素
  if (item) {
    list.value.unshift(item); // 将其插入到列表开头
  }

  // list.value=shuffle(list.value)
};


</script>

<template>

  <button @click="changeIsTransition">点击切换</button>

  <button @click="addTransitionGroupElement">点击添加元素</button>
  <button @click="subTransitionGroupElement">点击减少元素</button>


  <button @click="changeTransitionGroupElement">改变元素位置</button>

  <h1>{{ msg }}</h1>
  <h1 class="animate__animated animate__bounce">An animated element</h1>

  <transition
  enter-active-class="animate__animated  animate__heartBeat"
  leave-active-class="animate__animated animate__jello"
  mode="in-out"

  >
<!--  <div :key="isTransition.toString()">-->
    <h1 v-show="isTransition">
      An transition element
    </h1>
<!--  </div>-->
  </transition>


<transition-group  move-class="active"  tag="div">
    <h1 v-for="item in list" :key="item.index"> {{item.index}},{{ item.title }}</h1>
</transition-group>







</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.list-move {
  transition:  all 1s ease;
}

.active {
  transition:  all 1s ease;
}
</style>
