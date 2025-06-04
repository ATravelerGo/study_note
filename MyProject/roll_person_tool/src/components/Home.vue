<script setup lang="ts">
import { ref, onMounted } from "vue";
import VideoSource from '../assets/video/bg_video_new.mp4'
const isPlaying = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const singlePersonDOMList = ref<NodeListOf<Element> | null>(null);
const containerRef=ref<HTMLDivElement | null>(null);
const people = ref([
  "梁以宸",
  "王艺恒",
  "魏子欣",
  "胡峻恺",
  "张航",
  "马佳宁",
  "马玥婷",
  "王建博",
  "刘佳佳",
  "魏馨源",
  "张洛萌",
  "郭展言",
  "马嘉森",
  "崔浩桐",
  "庞翊彬",
  "赵文睿",
  "马浩鑫",
  "岳静淑",
  "张宸博",
  "花子煊",
  "马正宇",
  "崔轶群",
  "商子宁",
  "孔令轩",
  "李思涵",
  "周梓轩",
  "赵心怡",
  "孙泽宇",
  "韩明杰",
  "谢佳乐",
]);

let animationId: number | null = null;

// 动画函数
const animate = () => {
  const count =  people.value.length;
  let angle = 0;

  function updatePositions() {


    const a = 580; // 横轴（x）半径
    const b = 400; // 纵轴（y）半径

    singlePersonDOMList.value!.forEach((img:any, i) => {
      const theta = angle + (2 * Math.PI * i) / count;
      const x = a * Math.cos(theta);
      const y = b * Math.sin(theta);

      img.style.transform = `translate(${x + 630}px, ${y + 270}px)`;
      img.style.zIndex = Math.floor(100 + y); // 层级变化增强视觉深度
    });

    angle += 0.01; // 控制转速
    animationId= requestAnimationFrame(updatePositions);
  }
  updatePositions();
};

const startHandle = () => {
  isPlaying.value = !isPlaying.value;

  if (isPlaying.value) {
    videoRef.value?.play();
    animate();
  } else {
    videoRef.value?.pause();

    cancelAnimationFrame(animationId as number);
  }
};

const initPosition=()=>{
  const count =  people.value.length;
  let angle = 0;
  const a = 580; // 横轴（x）半径
  const b = 400; // 纵轴（y）半径

  singlePersonDOMList.value!.forEach((img:any, i) => {
    const theta = angle + (2 * Math.PI * i) / count;
    const x = a * Math.cos(theta);
    const y = b * Math.sin(theta);

    img.style.transform = `translate(${x + 630}px, ${y + 270}px)`;
    img.style.zIndex = Math.floor(100 + y); // 层级变化增强视觉深度
  });
}
onMounted(() => {
  singlePersonDOMList.value = document.querySelectorAll(".home_main_item");
  initPosition()



});
</script>

<template>
  <div class="home">
    <div @click="startHandle" class="startBtn">
      {{ isPlaying ? "暂停" : "开始" }}
    </div>

    <video
        ref="videoRef"
        loop
        style="width: 100%; height: 100%"
        :src="VideoSource"
    />

    <main class="home_main" ref="containerRef" >
      <div v-for="item in people" :key="item" class="home_main_item">
        <img class="home_main_item_avator"  src="../assets/images/pic.jpg"  alt="pic"/>
        <span>{{item}}</span>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 97vh;
  position: relative;

  .startBtn {
    width: 50px;
    height: 50px;
    border: 1px solid blue;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    position: absolute;
    z-index: 20;
  }

  &_main {
    width: 70%;
    height: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)  rotateX(20deg);
    &_item {
      width: 100px;
      height: 100px;
      transition: all ease-in-out 0.1s;
      position: absolute;
      display: flex;
      flex-direction: column;
      &_avator {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      span {
        color: white;
      }
    }
  }
}
</style>
