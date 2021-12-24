<template>
  <div class="cover">
    <div class="container">
      <CardList/>
    </div>
  </div>
</template>

<script>
import CardList from "../components/CardList";

export default {
  name: "AllCards",
  components: {CardList}
};
</script>

<style scoped>

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
