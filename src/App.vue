<template>
  <div class="container">
    <HelloWorld msg="Hello, world!"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

.container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  }
</style>
