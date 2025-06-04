<script setup lang="ts">
import { ref, onMounted } from "vue";

const people = ref([
  "梁以宸", "王艺恒", "魏子欣", "胡峻恺", "张航", "马佳宁",
  "马玥婷", "王建博", "刘佳佳", "魏馨源", "张洛萌", "郭展言",
  "马嘉森", "崔浩桐", "庞翊彬", "赵文睿", "马浩鑫", "岳静淑",
  "张宸博", "花子煊", "马正宇", "崔轶群", "商子宁", "孔令轩",
  "李思涵", "周梓轩", "赵心怡", "孙泽宇", "韩明杰", "谢佳乐",
]);

const containerRef = ref<HTMLDivElement | null>(null);
const itemList = ref<NodeListOf<HTMLElement>>();

let animationId: number;
let angleY = 0;

const animate = () => {
  const wrapper = containerRef.value?.querySelector(".ellipse_wrapper") as HTMLElement;
  if (wrapper) {
    wrapper.style.transform = `rotateY(${angleY}deg)`;
    angleY += 0.5;
  }
  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  itemList.value = document.querySelectorAll(".home_main_item");

  const a = 300; // 横向椭圆半轴
  const b = 150; // 纵向椭圆半轴
  const count = people.value.length;

  itemList.value.forEach((el, i) => {
    const theta = (2 * Math.PI * i) / count;
    const x = a * Math.cos(theta);
    const y = b * Math.sin(theta);

    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  animate();
});
</script>

<template>
  <div class="home">
    <main class="home_main" ref="containerRef">
      <div class="ellipse_wrapper">
        <div v-for="item in people" :key="item" class="home_main_item">
          <img class="home_main_item_avatar" src="../assets/images/pic.jpg" alt="pic" />
          <span>{{ item }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home_main {
  width: 800px;
  height: 600px;
  position: relative;
  perspective: 1000px; // 关键：开启 3D 视角
}

.ellipse_wrapper {
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  transform-origin: center center;
}

.home_main_item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 12px;
  transform-style: preserve-3d;
  transition: transform 0.2s;

  &_avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}
</style>