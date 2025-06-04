<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Test from './components/Test.vue'
// import Test2 from "./components/Test2.vue";
</script>

<template>
  <div>
<!--    <HelloWorld />-->
    <hr>
    <Test/>
  </div>
  <hr>
<!--  <Test2></Test2>-->
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
