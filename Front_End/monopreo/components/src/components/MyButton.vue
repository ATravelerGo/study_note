<script>
export default {
  name: 'MyButton',
}
</script>

<script setup lang="ts">


</script>

<template>
<button class="button">
  <slot name="default"></slot>
</button>
</template>

<style scoped>

.button {
  border: 1px solid red;
}

</style>
