<template>
  <div class="space"></div>
  <div class="form-container">
    <div class="card mb-5">
      <main class="form-add">
        <form>
          <h1 class="h3 mb-3 fw-normal">Enter your character detail</h1>

          <!-- section Name-->
          <div class="input-group">
            <input v-model="name" aria-label="Name" class="form-control" placeholder="Name" type="text">
            <span class="input-group-text">Generated slug</span>
            <input v-model="slug" aria-label="Server" class="form-control" placeholder="Slug" type="text">
          </div>
          <!-- section Image src-->
          <input v-model="imageURL" class="form-control" placeholder="Image source" type="text">
          <div class="justify-content-center d-flex">
            <img :src="imageURL" alt="avatar" class="img-thumbnail mt-2" height="150" width="auto">
          </div>

          <!-- section Position detail-->
          <h3 class="h5 fw-normal mt-3 text-center">Position(s):</h3>
          <div v-for="(item, index) in positionInputs" :key="index" class="input-group">
            <input v-model="item.name" aria-label="Position" class="form-control" placeholder="Position"
                   type="text">
            <span class="input-group-text">Start year</span>
            <input v-model="item.tenure[0]" aria-label="Start year" class="form-control" placeholder="Start year"
                   type="number">
            <span class="input-group-text">End year</span>
            <input v-model="item.tenure[1]" aria-label="End year" class="form-control" placeholder="End year"
                   type="number">

            <button v-if="index === 0" class="btn btn-outline-success" type="button" @click="addPositionInput">
              <i class="far fa-plus"></i>
            </button>
            <button v-else class="btn btn-outline-danger" type="button" @click="removePositionInput(index)">
              <i class="far fa-minus"></i>
            </button>
          </div>

          <!-- section Bio-->
          <h3 class="h5 fw-normal mt-3 text-center">Bio:</h3>
          <div v-for="(item, key) in bioInputs" :key="key" class="input-group bio">
            <span class="input-group-text bg-dark text-white text-capitalize first">{{ key }}</span>
            <span class="input-group-text text-capitalize">{{ Object.keys(item)[0] }}</span>
            <input v-model="Object.values(item)[0]" :placeholder="Object.values(item)[0]" aria-label="Start"
                   class="form-control"
                   type="text">
            <span class="input-group-text text-capitalize">{{ Object.keys(item)[1] }}</span>
            <input v-model="Object.values(item)[1]" :placeholder="Object.values(item)[1]" aria-label="End"
                   class="form-control"
                   type="text">
          </div>

          <!-- section Submit-->
          <button class="w-100 btn btn-lg btn-dark mt-5" type="submit" @click.prevent="handleSubmit">Add</button>
        </form>
      </main>
    </div>
  </div>

  <!-- section Toast message-->
  <Toast ref="toast"/>

</template>

<!-- section Script-->
<script>
import slug from "slug";
import {addDoc, collection} from "firebase/firestore";
import Toast from "../components/Toast";

function initialData()
{
  return {
    toastMessage: "",
    name: "",
    imageURL: "https://via.placeholder.com/150",
    slug: "",
    positionInputs: [{
      name: "",
      tenure: []
    }],
    bioInputs: {
      born: {
        year: "",
        place: ""
      },
      died: {
        year: "",
        place: ""
      },
      burial: {
        date: "",
        place: ""
      },
      house: {
        farther: "",
        mother: ""
      }
    }
  };
}

export default {
  name: "AddCard",
  components: {Toast},
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
    return initialData();
  },
  //section Watch
  /*
  *  __        __    _       _
  *  \ \      / /_ _| |_ ___| |__
  *   \ \ /\ / / _` | __/ __| '_ \
  *    \ V  V / (_| | || (__| | | |
  *     \_/\_/ \__,_|\__\___|_| |_|
  *
  */
  watch: {
    name(oldVal, newVal)
    {
      if (oldVal !== newVal && this.name)
      {
        this.slug = slug(this.name);
      }
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
    async addNewDoc()
    {
      //Add data to Firestore
      const data = {
        name: this.name,
        slug: this.slug,
        isFavorite: false,
        imageLink: this.imageURL,
        positions: this.positionInputs,
        bio: this.bioInputs
      };
      try
      {
        // Add a new document with a generated id.
        await addDoc(collection(db, "characters"), data);
        this.$refs.toast.showToast(`Successfully added a new character ${data.name}!`);
      }
      catch (e)
      {
        this.$refs.toast.showToast(`${e}!`, "error");
      }
    },
    addPositionInput()
    {
      this.positionInputs.push({
        name: "",
        tenure: []
      });
    },
    handleSubmit()
    {
      this.addNewDoc();
    },
    removePositionInput(index)
    {
      this.positionInputs.splice(index, 1);
    },
    resetData()
    {
      Object.assign(this.$data, initialData());
    }
  }
};
</script>

<!-- section Styles -->
<style lang="scss" scoped>
.form-container {

  img {
    max-height: 150px;
    width: auto;
  }

  .input-group {
    &, .bio {
      span {
        min-width: 85px;
      }
    }

    span.first {
      min-width: 80px;
    }
  }

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
