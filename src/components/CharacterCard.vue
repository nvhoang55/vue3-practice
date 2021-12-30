<template>
  <div :class="[ 'card', {favorite: currentIsFavorite}]">

    <!-- section Image -->
    <img :src="imageLink" alt="avatar" class="card-img-top">

    <div class="card-body">

      <!-- section Name -->
      <h5 class="card-title">{{ name }}</h5>

      <!-- section Positions -->
      <div class="position">

        <!--Year-->
        <label class="form-label" for="positionRange">
          <span v-if="year == bio.died.year">
            <i class="fas fa-skull"></i>
            <i class="fas fa-skull"></i>
            <i class="fas fa-skull"></i>
          </span>
          <div v-else>
            <div><span v-show="year == bio.born.year">Born: </span>{{ year }}</div>
          </div>

        </label>

        <!--Year range input-->
        <input id="positionRange" v-model="year" :max="bio.died.year" :min="bio.born.year" class="form-range"
               type="range">

        <!--Position-->
        <div>Position:</div>
        <span v-for="(pos, index) in position" :key="index" :class="['badge', 'bg-' + currentStyle]">
          {{ pos }}
        </span>

      </div>
    </div>

    <!-- section Bio -->
    <div class="bio">

      <!--Tab-->
      <ul id="bioTab" class="nav nav-tabs" role="tablist">
        <li v-for="(bio, key, index) in orderedBio" :key="key+'-tab'" class="nav-item" role="presentation">
          <button :id="`${key}-${id}`+'-tab'"
                  :aria-controls="`${key}-${id}`"
                  :aria-selected="index === 0"
                  :class="['nav-link', index === 0 ? 'active' : '']"
                  :data-bs-target="'#'+`${key}-${id}`"
                  data-bs-toggle="tab" role="tab" type="button">
            {{ key }}
          </button>
        </li>
      </ul>

      <!--Tab content-->
      <div id="myTabContent" class="tab-content">
        <div v-for="(bio, key, index) in orderedBio"
             :id="`${key}-${id}`"
             :key="key+'-content'"
             :aria-labelledby="`${key}-${id}`+'-tab'"
             :class="['tab-pane', 'fade', index === 0 ? 'show active' : '']"
             role="tabpanel">
          <ul class="list-group">
            <li v-for="(data, key) in bio" :key="key" class="list-group-item">
              <span>{{ key }}:</span>
              <span>{{ data }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <!-- section Bottom -->
    <div class="card__bottom">
      <va-button color="danger" icon="delete" @click="remove">Remove</va-button>
      <router-link :class="['btn', 'btn-' + currentStyle]" :to="{ name: 'Detail', params: {slug} }">
        More Info
      </router-link>
      <div class="form-check">
        <input id="flexCheckDefault" v-model="currentIsFavorite" class="form-check-input" type="checkbox">
      </div>
    </div>

    <!--  Hidden button use for display Vuestic toast message-->
    <va-button ref="toast" class="d-none" @click="$vaToast.init({ message: toastMessage, color: toastColor })">
      Hidden
    </va-button>


  </div>
</template>

<script>
import {deleteDoc, doc, updateDoc} from "firebase/firestore";

export default {

  props: ["id", "name", "bio", "infoLink", "imageLink", "isFavorite", "positions", "slug"],
  emits: ["update:isFavorite", "reFetchData"],
  // section Data
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
      toastMessage: "",
      toastColor: "success",
      year: this.bio.born.year,
      currentIsFavorite: this.isFavorite
    };
  },
  // section Watch
  /*
  *  __        __    _       _
  *  \ \      / /_ _| |_ ___| |__
  *   \ \ /\ / / _` | __/ __| '_ \
  *    \ V  V / (_| | || (__| | | |
  *     \_/\_/ \__,_|\__\___|_| |_|
  *
  */
  watch: {
    currentIsFavorite(oldVal, newVal)
    {
      if (newVal !== oldVal)
      {
        //Update isFavorite in CardList
        this.$emit("update:isFavorite", this.currentIsFavorite);

        this.updateDoc();
      }
    }
  },
  // section Methods
  /*
  *   __  __      _   _               _
  *  |  \/  | ___| |_| |__   ___   __| |___
  *  | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
  *  | |  | |  __/ |_| | | | (_) | (_| \__ \
  *  |_|  |_|\___|\__|_| |_|\___/ \__,_|___/
  *
  */
  methods: {
    async remove()
    {
      await deleteDoc(doc(db, "characters", this.id))
          .then(() =>
          {
            this.$emit("reFetchData");
            this.toastMessage = `Removed ${this.name}`;
            this.$refs.toast.click();
          });
    },
    async updateDoc()
    {
      //Update isFavorite on Firebase
      const dataDocumentReference = doc(db, "characters", this.id);

      await updateDoc(dataDocumentReference, {
        isFavorite: this.currentIsFavorite
      });
    }
  },
  // section Computed
  /*
  *    ____                            _           _
  *   / ___|___  _ __ ___  _ __  _   _| |_ ___  __| |
  *  | |   / _ \| '_ ` _ \| '_ \| | | | __/ _ \/ _` |
  *  | |__| (_) | | | | | | |_) | |_| | ||  __/ (_| |
  *   \____\___/|_| |_| |_| .__/ \__,_|\__\___|\__,_|
  *                       |_|
  */
  computed: {
    // Re-order data in bio since Firestore mess it up
    orderedBio()
    {
      return {
        born: this.bio.born,
        died: this.bio.died,
        burial: this.bio.burial,
        house: this.bio.house
      };
    },
    currentStyle()
    {
      return this.currentIsFavorite ? "success" : "dark";
    },
    position()
    {
      let currentPosition = [];
      for (let position of this.positions)
      {
        if (this.year <= position.tenure[1] && this.year >= position.tenure[0])
        {
          currentPosition.push(position.name);
        }
      }
      return currentPosition.length === 0 ? ["no position"] : currentPosition;
    }
  },
  name: "CharacterCard"
};
</script>

// section Style
<style lang="scss" scoped>

</style>
