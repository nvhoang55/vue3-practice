<template>
  <Navbar/>
  <div class="container">
    <router-view/>
  </div>
  <Footer/>
</template>

<script>

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {Navbar, Footer}
};
</script>

<style lang="scss">
//@import "./assets/styles/normalize.css";
@import './assets/styles/scss/custom';
@import '~bootstrap-icons/font/bootstrap-icons.css';

html, body {
  font-family: 'Hahmlet', serif;
  background: url("./assets/images/map.png");
  background-size: cover;
}

</style>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
