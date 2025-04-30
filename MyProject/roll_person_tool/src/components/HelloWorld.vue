<script setup lang="ts">
import { ref, onMounted } from "vue";
import videoSource from "../assets/video/bg_video.mp4";
const isPlaying = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const singlePersonDOMList = ref<NodeListOf<Element> | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
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
const SPEED = 50;

let animationId: number | null = null;

// 动画函数
const animate = () => {
  const container = containerRef.value;
  if (!container) return;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  singlePersonDOMList.value!.forEach((ball: any) => {
    console.dir(ball);

    ball.dx = (Math.random() - 0.5) * SPEED;
    ball.dy = (Math.random() - 0.5) * SPEED;

    const elWidth = ball.offsetWidth;
    const elHeight = ball.offsetHeight;

    ball.x += ball.dx;

    ball.y += ball.dy;

    if (ball.x < 0) {
      ball.x = 0;
      ball.dx *= -1;
    } else if (ball.x + elWidth > containerWidth) {
      ball.x = containerWidth - elWidth;
      ball.dx *= -1;
    }

    if (ball.y < 0) {
      ball.y = 0;
      ball.dy *= -1;
    } else if (ball.y + elHeight > containerHeight) {
      ball.y = containerHeight - elHeight;
      ball.dy *= -1;
    }
    ball.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
  });
  let rotation = 0;
  rotation += 0.1; // 控制旋转速度，值越小越慢
  container.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

  animationId = requestAnimationFrame(animate);
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

onMounted(() => {
  singlePersonDOMList.value = document.querySelectorAll(".home_main_item");

  const container: HTMLDivElement = containerRef.value;


  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  singlePersonDOMList.value.forEach((ball: any) => {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const offsetX = (Math.random() - 0.5) * containerWidth * 0.4; // 原本是1.0
    const offsetY = (Math.random() - 0.5) * containerHeight * 0.4;

    ball.x = Math.min(Math.max(centerX + offsetX, 0), containerWidth - ball.offsetWidth);
    ball.y = Math.min(Math.max(centerY + offsetY, 0), containerHeight - ball.offsetHeight);

    ball.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
  });
});
</script>

<template>
  <div class="home">
    <div @click="startHandle" class="startBtn">
      {{ isPlaying ? "暂停" : "开始" }}
    </div>

    <video
      ref="videoRef"
      style="width: 100%; height: 100%"
      :src="videoSource"
    />

    <main class="home_main" ref="containerRef" style="border: 1px solid red">
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
    transform: translate(-50%, -50%);
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
