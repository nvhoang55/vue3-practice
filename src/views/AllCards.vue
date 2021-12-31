<script setup>
import CardList from "../components/CardList";
import {computed, onBeforeMount, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";

//section Data
const cardOnOnePage = 3;
const currentPage = ref(1);
const totalPages = ref(1);
const totalCharacters = ref([]);

//section Computed
const charactersOnPage = computed(() =>
{
  const start = (currentPage.value - 1) * cardOnOnePage;
  const end = currentPage.value * cardOnOnePage;
  return totalCharacters.value.slice(start, end);
});

// section Mounted
onBeforeMount(async () =>
{
  //Fetch data from firebase on mount
  await getDocs(collection(db, "characters"))
      .then(querySnapshot =>
      {
        //Remove old data in case re-fetching
        querySnapshot.forEach((doc) =>
        {
          totalCharacters.value.push({id: doc.id, ...doc.data()});
        });
        //Calculate total page
        totalPages.value = Math.ceil(totalCharacters.value.length / cardOnOnePage);
      })
      .catch(e => console.log(e));
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
