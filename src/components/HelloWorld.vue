<template>
  <div class="card" style="width: 18rem;">
    <img src="{{ imageLink }}" class="card-img-top" alt="Feitan">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ quote }}</p>
      <a href="{{ infoLink }}" class="btn btn-primary">More info</a>
    </div>
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      name: "Feitan",
      quote: "Welcome, ladies and gentlemen. Let us do without formal greeting... You all die now",
      infoLink: "https://hunterxhunter.fandom.com/wiki/Feitan_Portor",
      age: 22,
      imageLink: "https://cdn.myanimelist.net/images/characters/10/174721.jpg"
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<style scoped>
</style>
