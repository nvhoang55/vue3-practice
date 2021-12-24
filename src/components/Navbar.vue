<template>
  <div class="header">
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link :to="{ name: 'AllCards'}" active-class="active" class="nav-link">All cards</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'AddCard'}" active-class="active" class="nav-link">Add a cards</router-link>
          </li>
        </ul>
      </header>
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
