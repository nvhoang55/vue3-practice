<template>
  <div class="cover">
    <div class="container">
      <CardList/>
    </div>
  </div>
</template>

<script>
import CardList from "./components/CardList";

export default {
  name: "App",
  components: {
    CardList
  }
};
</script>

<style lang="scss">
@import "./assets/styles/normalize.css";
@import './assets/styles/scss/custom';
@import '~bootstrap-icons/font/bootstrap-icons.css';

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Hahmlet:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import "./assets/styles/scss/card";

html, body {
  font-family: 'Hahmlet', serif;
}

body {
  background: url("./assets/images/map.png");
  background-size: cover
}

.cover {
  height: 100%;
  width: 100%;
  background: #84080847;
}

.container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}


</style>
