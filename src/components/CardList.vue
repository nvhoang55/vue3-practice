<template>
  <div class="container--cards">
    <CharacterCard v-for="character in characters"
                   :key="character.name"
                   v-bind="character"
                   @update:favorite="character.favorite = $event"
    />
  </div>
</template>

<script>
import CharacterCard from "./CharacterCard";

export default {
  name: "CardList",
  components: {CharacterCard},
  data()
  {
    return {
      characters: [
        {
          name: "Feitan Portor",
          strength: 122,
          hp: 100,
          bio: {
            age: 26,
            gender: "Male",
            height: "177 cm",
            weight: "68 kg"
          },
          imageLink: "https://cdn.myanimelist.net/images/characters/10/174721.jpg",
          infoLink: "https://hunterxhunter.fandom.com/wiki/Feitan_Portor",
          favorite: false
        },
        {
          name: "Chrollo Lucilfer",
          strength: 144,
          hp: 100,
          bio: {
            age: 22,
            gender: "Male",
            height: "156 cm",
            weight: "45 kg"
          },
          infoLink: "https://hunterxhunter.fandom.com/wiki/Chrollo_Lucilfer",
          imageLink: "https://img.wattpad.com/cover/256049994-256-k179109.jpg",
          favorite: false
        },
        {
          name: "Franklin Bordeau",
          strength: 300,
          hp: 200,
          bio: {
            age: 23,
            gender: "Male",
            height: "219 cm",
            weight: "225 kg"
          },
          infoLink: "https://hunterxhunter.fandom.com/wiki/Franklin_Bordeau",
          imageLink: "https://cdn.myanimelist.net/images/characters/7/373723.jpg",
          favorite: false
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../assets/styles/scss/card";

</style>
