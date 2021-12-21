<template>
  <div :class="[ 'card', {favorite: currentFavorite} ]">

    <!-- section Image -->
    <img :src="imageLink" alt="Feitan" class="card-img-top">

    <div class="card-body">

      <!-- section Name -->
      <h5 class="card-title">{{ name }}</h5>

      <!-- section HP -->
      <div class="hp">
        <label class="form-label" for="hpRange">
          <span v-if="currentHP > 0">
            <span v-show="currentHP < hp/2">{{ name }} is low.</span>
            HP: {{ currentHP }}</span>
          <span v-else>
            <i class="fas fa-skull"></i>
            <i class="fas fa-skull"></i>
            <i class="fas fa-skull"></i>
          </span>
        </label>
        <input id="hpRange" v-model="currentHP" :max="hp" class="form-range" min="0" type="range">
      </div>

      <!-- section Strength -->
      <div class="container--strength">
        <h6>Strength</h6>
        <button :class="['btn', btnStyle]" @click="decreaseStrength"><i class="bi bi-chevron-down"></i></button>
        <div class="alert alert-dark strength" role="alert">
          {{ currentStrength }}
        </div>
        <button :class="['btn', btnStyle]" @click="increaseStrength"><i class="bi bi-chevron-up"></i></button>
      </div>

    </div>
    <!-- section Bio -->
    <ul class="list-group list-group-flush">
      <li v-for="(value, key) in bio" :key="key" class="list-group-item">
        <span class="key">{{ key }}:</span>
        <span>{{ value }}</span>
      </li>
    </ul>

    <!-- section Bottom -->
    <div class="card__bottom">
      <a :class="['btn', btnStyle]" :href="infoLink">More info</a>
      <div class="form-check">
        <input id="flexCheckDefault" v-model="currentFavorite" class="form-check-input" type="checkbox">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ["name", "strength", "hp", "bio", "infoLink", "imageLink", "favorite"],
  data()
  {
    return {
      currentStrength: this.strength,
      currentHP: this.hp,
      currentFavorite: this.favorite
    };
  },
  watch: {
    currentFavorite(oldVal, newVal)
    {
      if (newVal !== oldVal)
      {
        this.updateFavorite();
      }
    }
  },
  methods: {
    increaseStrength()
    {
      this.currentStrength += 10;
    },
    decreaseStrength()
    {
      this.currentStrength -= 10;
    },
    updateFavorite()
    {
      this.$emit("update:favorite", this.currentFavorite);
    }
  },
  computed: {
    btnStyle()
    {
      return this.currentFavorite ? "btn-success" : "btn-dark";
    }
  },
  name: "CharacterCard"
};
</script>

<style lang="scss" scoped>

</style>
