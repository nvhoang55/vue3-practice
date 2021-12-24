<template>
  <div class="cover">
  </div>
  <div class="space"></div>
  <CardList/>
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
  position: fixed;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  background: #84080847;
}
</style>
