<script setup lang="ts">
import {ref,nextTick} from 'vue'
import pod1 from '../assets/pod/pod1.png'
import pod2 from '../assets/pod/pod2.png'
import pod3 from '../assets/pod/pod3.png'
import pod4 from '../assets/pod/pod4.png'
import pod5 from '../assets/pod/pod5.png'


defineProps<{ msg: string }>()




const list=ref([{
  img:pod1,
  title:"A transition-group element",
  index:0
},
  {
    img:pod2,
    title:"A transition-group element",
    index:1
  },
  {
    img:pod3,
    title:"A transition-group element",
    index:2
  },
  {
    img:pod4,
    title:"A transition-group element",
    index:3
  },
  {
    img:pod5,
    title:"A transition-group element",
    index:4
  },
])



const changeTransitionGroupElement = (type) => {

  if(type===-1){

    const item = list.value[list.value.length-1]; // 删除最后一个元素



    nextTick(()=>{




      const firstDOM= document.querySelector('.img')



      const img=document.createElement('img');
      img.src=item.img


      console.log("新创建的元素",img)

      document.querySelector('.imageList').appendChild(img)

    })


    if (item) {
      list.value.push(item); // 将其插入到列表开头
    }

  }else {
    const item = list.value.pop(); // 删除最后一个元素
    if (item) {
      list.value.unshift(item); // 将其插入到列表开头
    }
  }



  // list.value=shuffle(list.value)
};


</script>

<template>



  <button @click="changeTransitionGroupElement(-1)">向左滑动</button>
  <button @click="changeTransitionGroupElement(1)">向右滑动</button>



<div  class="image-container" >
  <transition-group    move-class="active" class="imageList"  tag="div">
    <img class="img" v-for="(item) in list" :key="item.img"  :src="item.img" width="150" alt="png" />
  </transition-group>
</div>








</template>

<style scoped>
.image-container {
  border: 1px solid red;
  width: 450px;
  overflow: hidden;
}
.imageList {
  display: flex;
}
.active{
  transition:  all 1s ease;
}
</style>
