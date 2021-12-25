<template>
  <div class="container--cards">

    <!--Show loading if no data-->
    <div v-if="characters.length === 0" class="lds-ring position-absolute start-50 translate-middle">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- No favorite cards-->
    <div v-else-if="filteredData.length === 0" class="no-favorite">
      <span>No favorite card</span>
    </div>
    <!-- section Card list -->
    <CharacterCard v-for="character in filteredData" v-else
                   :key="character.name"
                   v-model:is-favorite="character.isFavorite"
                   v-bind="character"
    />

    <!-- section Filter-->
    <div class="filter">
      <div class="btn-group">
        <button id="dLabel" aria-expanded="false" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                type="button">
          {{ currentFilterOption }}
        </button>
        <ul aria-labelledby="dLabel" class="dropdown-menu">

          <li v-for="option in filterOptions" :key="option">
            <button :class="['dropdown-item', option === currentFilterOption.toLowerCase() ? 'active' : '']"
                    @click="updateOption($event)">{{ option }}
            </button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import CharacterCard from "./CharacterCard";
import db from "../Firebase/setup";
import {collection, getDocs} from "firebase/firestore";

export default {
  name: "CardList",
  components: {CharacterCard},
  //section Data
  /*
  *   ____        _
  *  |  _ \  __ _| |_ __ _
  *  | | | |/ _` | __/ _` |
  *  | |_| | (_| | || (_| |
  *  |____/ \__,_|\__\__,_|
  *
  */

  data()
  {
    return {
      characters: [],
      currentFilterOption: "All",
      filterOptions: ["all", "favorite"]
    };
  },
  //section Computed
  /*
  *    ____                            _           _
  *   / ___|___  _ __ ___  _ __  _   _| |_ ___  __| |
  *  | |   / _ \| '_ ` _ \| '_ \| | | | __/ _ \/ _` |
  *  | |__| (_) | | | | | | |_) | |_| | ||  __/ (_| |
  *   \____\___/|_| |_| |_| .__/ \__,_|\__\___|\__,_|
  *                       |_|
  */
  computed: {
    filteredData()
    {
      if (this.currentFilterOption === "Favorite")
      {
        return this.characters.filter(character => character.isFavorite);
      }
      return this.characters;
    }
  },
  //section Methods
  /*
  *   __  __      _   _               _
  *  |  \/  | ___| |_| |__   ___   __| |___
  *  | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
  *  | |  | |  __/ |_| | | | (_) | (_| \__ \
  *  |_|  |_|\___|\__|_| |_|\___/ \__,_|___/
  *
  */
  methods: {
    updateOption(e)
    {
      this.currentFilterOption = e.target.innerText;
    },
    async fetchData()
    {
      const querySnapshot = await getDocs(collection(db, "characters"));
      querySnapshot.forEach((doc) =>
      {
        this.characters.push({id: doc.id, ...doc.data()});
      });
    }
  },
  mounted()
  {
    this.fetchData();
  }
};
</script>

<!-- section Styles -->
<style lang="scss" scoped>
@import "../assets/styles/scss/loader";
</style>
