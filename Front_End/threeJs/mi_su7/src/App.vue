<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
onMounted(() => {
  const container = document.querySelector(".main") as Element;
  //获取容器的宽高
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  //创建场景
  const scene = new THREE.Scene();

  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  //创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(containerWidth, containerHeight);
  //renderer.setClearColor(0xffffff, 1);
  //然后把渲染器渲染出来的canvas添加到容器中
  container.appendChild(renderer.domElement);

  //控制轨道
  const controls = new OrbitControls(camera, renderer.domElement);

  // 也可以添加辅助的光源
  // const helper = new THREE.DirectionalLightHelper(directionalLight, 1); // 可视化方向光的位置和方向
  //scene.add(helper);
  //这里是渲染模型（渲染小米汽车的su7模型 gltf的）
  const loader = new GLTFLoader();
  // loader.setDRACOLoader(dracoLoader);
  loader.load(
    "/su7/scene.gltf",
    (gltf) => {
      //加载成功的回调
      scene.add(gltf.scene);

      // 获取模型的边界框并计算中心
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      //创建发光板  // 创建方向光并将其放置在模型上方
      const geometry = new THREE.PlaneGeometry(5, 5); //创建平面几何
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff, // 发光板的颜色
        emissive: 0xffffff, // 发光的颜色
        emissiveIntensity: 10, // 发光强度
      });
      const glowingPlane = new THREE.Mesh(geometry, material);
      glowingPlane.rotation.x = -Math.PI / 2; // 使平面水平放置
      glowingPlane.rotation.y = Math.PI;
      scene.add(glowingPlane);

      glowingPlane.position.set(center.x, box.max.y + 2, center.z);

      // 创建矩形区域光
      // const rectLight = new THREE.RectAreaLight(0xffffff, 15, 5, 5); // 绿色光，强度5，宽高5
      // rectLight.position.set(center.x + 10, box.max.y + 2, center.z); // 放置在发光板上方
      // //rectLight.lookAt(glowingPlane.position); // 照向发光板
      // scene.add(rectLight);

      //顶上的光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(center.x, box.max.y + 5, center.z); // 设置光源位置
      directionalLight.castShadow = true; // 开启阴影
      scene.add(directionalLight);

      // 可视化方向光的帮助器
      const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
      scene.add(helper);
    },
    (xhr) => {
      //进度回调
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // 加载错误的回调
    (error) => {
      console.error("An error happened", error);
    },
  );

  //这里就是保证实时渲染
  const animation = () => {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    controls.update();
  };

  animation();
});
</script>

<template>
  <div class="main"></div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
