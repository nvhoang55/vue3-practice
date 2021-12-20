<template>
  <div class="container">
    <CharacterCard msg="Hello, world!"/>
  </div>
</template>

<script>
import CharacterCard from "./components/CharacterCard.vue";

export default {
  name: "App",
  components: {
    CharacterCard
  }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

.container {
  /*Container size*/
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}

body {
  /*Gradient background*/
  background: #0F2027;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
