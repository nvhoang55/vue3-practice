<template>
  <div class="container">
    <CardList/>
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

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-icons/font/bootstrap-icons.css';

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Hahmlet:wght@100;200;300;400;500;600;700;800;900&display=swap');

html, body {
  font-family: 'Hahmlet', serif;
}

.container {
  /*Container size*/
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}

body {
  /*Gradient background*/
  background: #0F2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
