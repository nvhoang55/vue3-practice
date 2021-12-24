<template>
  <div class="header navbar navbar-expand-md navbar-dark fixed-top">
    <div class="container-fluid justify-content-center">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link :to="{ name: 'AllChar'}" active-class="active" class="nav-link">All cards</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'AddChar'}" active-class="active" class="nav-link">Add a cards</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
</style>
