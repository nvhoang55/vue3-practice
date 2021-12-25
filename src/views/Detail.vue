<template>
  <div class="card">
    <div class="row">
      <div>Detail page</div>
      <span>Character: {{ slug }}</span>
    </div>
    <router-link :to="{ name: 'AllChar'}" class="btn btn-dark back">Back</router-link>
  </div>
</template>

<script>
export default {
  name: "Detail",
  //section Props
  /*
  *   ____
  *  |  _ \ _ __ ___  _ __  ___
  *  | |_) | '__/ _ \| '_ \/ __|
  *  |  __/| | | (_) | |_) \__ \
  *  |_|   |_|  \___/| .__/|___/
  *                  |_|
  */
  props: ["slug"]
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  min-height: 80%;
}

.back {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

</style>
