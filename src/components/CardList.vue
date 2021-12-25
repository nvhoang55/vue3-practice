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
  created()
  {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.lds-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  top: 20%;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
