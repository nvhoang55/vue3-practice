<template>
  <div class="container--cards">

    <!--Show loading if no data-->
    <Loader v-if="currentCharacters.length === 0" class="position-absolute start-50 translate-middle"/>
    <!-- No favorite cards-->
    <div v-else-if="filteredData.length === 0" class="no-favorite">
      <span>No favorite card</span>
    </div>
    <!-- section Card list -->
    <CharacterCard v-for="character in filteredData" v-else
                   :key="character.name"
                   v-model:is-favorite="character.isFavorite"
                   v-bind="character"
                   @re-fetch-data="fetchData"
    />

    <!-- section Filter-->
    <div class="filter">
      <va-switch v-model="showFavorites" color="danger" false-inner-label="All"
                 style="min-width: 110px" true-inner-label="Favorite"/>
    </div>

  </div>
</template>

<script>
import CharacterCard from "./CharacterCard";
import {collection, getDocs} from "firebase/firestore";
import Loader from "./Loader";

export default {
  name: "CardList",
  components: {CharacterCard, Loader},
  //section Props
  props: ["currentCharacters"],
  //section Data
  data()
  {
    return {
      characters: this.currentCharacters,
      showFavorites: false
    };
  },
  //section Computed
  computed: {
    filteredData()
    {
      if (this.showFavorites)
      {
        return this.currentCharacters.filter(character => character.isFavorite);
      }
      return this.currentCharacters;
    }
  },
  //section Methods
  methods: {
    updateOption(e)
    {
      this.currentFilterOption = e.target.innerText;
    },
    async fetchData()
    {
      await getDocs(collection(db, "characters"))
          .then(querySnapshot =>
          {
            //Remove old data in case re-fetching
            this.characters = [];
            querySnapshot.forEach((doc) =>
            {
              this.characters.push({id: doc.id, ...doc.data()});
            });
          })
          .catch(e => console.log(e));
    }
  },
  mounted()
  {
    // this.fetchData();
  }
};
</script>

<!-- section Styles -->
<style lang="scss" scoped>
</style>
