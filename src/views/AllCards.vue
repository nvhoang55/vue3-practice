<script setup>
import CardList from "../components/CardList";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

//section Data
const cardOnOnePage = 3;
const currentPage = ref(1);
const totalPages = ref(1);

//section Computed
const charactersOnPage = computed(() =>
{
  const start = (currentPage.value - 1) * cardOnOnePage;
  const end = currentPage.value * cardOnOnePage;
  console.log("this.$store", store);
  return store.state.allCharacters.slice(start, end);
});

// section Mounted
onMounted(() =>
{
  store.dispatch("fetchCharacters");
});

</script>

<template>
  <div class="cover">
  </div>
  <div class="space"></div>
  <!--<div>{{ characters }}</div>-->
  <va-pagination v-model="currentPage" :pages="totalPages" class="mb-3 vuestic-pagination" color="#F6D393"/>
  <CardList :current-characters="charactersOnPage"/>
</template>

<style lang="scss">
.vuestic-pagination {
  .va-button__content {
    color: #000000;
  }
}

.cover {
  position: fixed;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  background: #84080847;
}
</style>
