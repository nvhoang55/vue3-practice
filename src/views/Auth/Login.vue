<template>
  <div class="form-container">
    <div class="card">
      <main class="form-add">
        <form>
          <h1 class="h3 mb-3 fw-normal">Enter your character info</h1>

          <div class="form-floating">
            <input id="floatingInput" class="form-control" placeholder="name@example.com" type="email">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input id="floatingPassword" class="form-control" placeholder="Password" type="password">
            <label for="floatingPassword">Password</label>
          </div>

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-dark" type="submit">Add</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
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
    min-width: 400px;

    .form-add {
      width: 100%;
      padding: 15px;
      margin: auto;

      .checkbox {
        font-weight: 400;
      }

      .form-floating {
        &:focus-within {
          z-index: 2;
        }
      }

      input {
        color: black;
      }

      input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
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
