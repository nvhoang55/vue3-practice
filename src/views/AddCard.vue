<template>
  <div class="form-container">
    <div class="card">
      <main class="form-add">
        <form>
          <h1 class="h3 mb-3 fw-normal">Enter your character info</h1>

          <!--Name-->
          <div class="input-group">
            <input v-model="name" aria-label="Name" class="form-control" placeholder="Name" type="text">
            <span class="input-group-text">Generated slug</span>
            <input v-model="slug" aria-label="Server" class="form-control" placeholder="Slug" type="text">
          </div>
          <!--Image src-->
          <input id="exampleFormControlInput1" class="form-control" placeholder="Image source" type="text">
          <!--Position detail-->
          <h3 class="h5 fw-normal mt-3 text-center">Position(s):</h3>
          <div class="input-group">
            <input aria-label="Position" class="form-control" placeholder="Position" type="text">
            <span class="input-group-text">Start</span>
            <input aria-label="Start" class="form-control" placeholder="Start" type="number">
            <span class="input-group-text">End</span>
            <input aria-label="End" class="form-control" placeholder="End" type="number">
            <button id="button-addon2" class="btn btn-outline-secondary" type="button">+</button>
          </div>


          <button class="w-100 btn btn-lg btn-dark mt-5" type="submit">Add</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import {string_to_slug} from "../helper";

export default {
  name: "AddCard",
  data()
  {
    return {
      name: "",
      slug: ""
    };
  },
  watch: {
    name(oldVal, newVal)
    {
      if (oldVal !== newVal && this.name)
      {
        this.slug = string_to_slug(this.name);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {

  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .card {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    min-width: 600px;

    .form-add {
      width: 100%;
      padding: 15px;
      margin: auto;

      button[type=submit] {
        margin-top: 10px;
      }

      .form-floating {
        &:focus-within {
          z-index: 2;
        }
      }

      input {
        background-color: rgba(255, 255, 255, 0.65);
      }
    }
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
}

</style>
