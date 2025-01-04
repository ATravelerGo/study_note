<script setup lang="ts">
import * as THREE from "three"
import {onMounted} from 'vue'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

onMounted(() => {

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  camera.position.set(0, 0, 20)
  const renderer = new THREE.WebGLRenderer()

  renderer.setClearColor(0xFFFFFF, 1.0);

  renderer.setSize(500, 500)


  const geometry = new THREE.CylinderGeometry(5, 5, 5)
  const material = new THREE.MeshBasicMaterial({color: 0xff0cbf})
  const cylinder = new THREE.Mesh(geometry, material)
  scene.add(cylinder)

  // const geometry = new THREE.BoxGeometry( 10, 10, 10 );
  // const material = new THREE.MeshBasicMaterial( {color: 0x85555} );
  // const cube = new THREE.Mesh( geometry, material );
  // scene.add(cube);
  const controls = new OrbitControls(camera, renderer.domElement);


  const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);
  document.querySelector('.three')?.appendChild(renderer.domElement)


  const render = () => {

    controls.update()
    renderer.render(scene, camera)


    requestAnimationFrame(render)

  }


  render()


})


</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>

    <hr>

    <div class="three"></div>


  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
