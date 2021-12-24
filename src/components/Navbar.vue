<template>
  <div class="header">
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item"><a aria-current="page" class="nav-link active" href="#">Home</a></li>
          <!--<li class="nav-item"><a class="nav-link" href="#">All cards</a></li>-->
          <li class="nav-item">
            <router-link class="nav-link" to="/all">All cards</router-link>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">Add a card</a></li>
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
