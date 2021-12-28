<template>
  <div class="space"></div>
  <div class="form-container">
    <div class="card mb-5">
      <main class="form-add">
        <Form v-slot="{ errors, meta }" :initial-values="initialData" :validation-schema="validateSchema"
              @submit.prevent="handleSubmit">
          <h1 class="h3 mb-3 fw-normal">Enter your character detail</h1>

          <!-- section Name-->
          <div class="input-group">
            <Field v-model="name" :class="['form-control', errors.name && 'error']"
                   :placeholder="errors.name ?? 'Name'"
                   aria-label="Name"
                   name="name" type="text"/>
          </div>

          <!-- section Image src-->
          <Field v-model="imageURL" :class="['form-control', errors.imageURL && 'error']"
                 :placeholder="errors.imageURL ?? 'Image source'"
                 name="imageURL" type="url"/>
          <div class="justify-content-center d-flex">
            <img :src="imageURL" alt="avatar" class="img-thumbnail mt-2" height="150" width="auto">
          </div>

          <!-- section Position detail-->
          <h3 class="h5 fw-normal mt-3 text-center">Position(s):</h3>
          <div v-for="(item, index) in positions" :key="index" class="input-group">
            <Field :class="['form-control', errors[`positions[${index}].name`] && 'error']"
                   :name="`positions[${index}].name`"
                   :placeholder="errors[`positions[${index}].name`] ?? 'Position'"
                   aria-label="Position"
                   type="text"/>
            <span class="input-group-text">Start year</span>
            <Field :class="['form-control', errors[`positions[${index}].tenure[0]`] && 'error']"
                   :name="`positions[${index}].tenure[0]`"
                   :placeholder="errors[`positions[${index}].tenure[0]`] ?? 'Start year'"
                   aria-label="Start year"
                   min="1"
                   type="number"
            />
            <span class="input-group-text">End year</span>
            <Field :class="['form-control', errors[`positions[${index}].tenure[1]`] && 'error']"
                   :name="`positions[${index}].tenure[1]`"
                   :placeholder="errors[`positions[${index}].tenure[1]`] ?? 'End year'"
                   aria-label="End year"
                   min="1"
                   type="number"/>

            <button v-if="index === 0" class="btn btn-outline-success" type="button" @click="addPositionInput">
              <i class="far fa-plus"></i>
            </button>
            <button v-else class="btn btn-outline-danger" type="button" @click="removePositionInput(index)">
              <i class="far fa-minus"></i>
            </button>
          </div>

          <!-- section Bio-->
          <h3 class="h5 fw-normal mt-3 text-center">Bio:</h3>
          <div v-for="(item, key) in bio" :key="key" class="input-group bio">
            <span class="input-group-text bg-dark text-white text-capitalize first">{{ key }}</span>
            <span class="input-group-text text-capitalize">{{ Object.keys(item)[0] }}</span>
            <Field :class="['form-control', errors[`bio.${key}.${Object.keys(item)[0]}`] && 'error']"
                   :name="`bio.${key}.${Object.keys(item)[0]}`"
                   :placeholder="errors[`bio.${key}.${Object.keys(item)[0]}`] ?? Object.values(item)[0]"
                   aria-label="Start"
                   type="text"/>
            <span class="input-group-text text-capitalize">{{ Object.keys(item)[1] }}</span>
            <Field :class="['form-control', errors[`bio.${key}.${Object.keys(item)[1]}`] && 'error']"
                   :name="`bio.${key}.${Object.keys(item)[1]}`"
                   :placeholder="errors[`bio.${key}.${Object.keys(item)[1]}`] ?? Object.values(item)[1]"
                   aria-label="End"
                   type="text"/>
          </div>

          <!-- section Submit-->
          <button :disabled="!meta.dirty" class="w-100 btn btn-lg btn-dark mt-5" type="submit">Add</button>
        </Form>
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
import {array, boolean, number, object, string} from "yup";
import {Field, Form} from "vee-validate";

export default {
  name: "AddCard",
  components: {Toast, Form, Field},
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
    //Form validate schema
    const validateSchema = object({
      name: string().required("Name is required"),
      isFavorite: boolean().required(),
      imageURL: string().required("An image URL is required"),
      positions: array().length(1).of(object({
        name: string().required("Required"),
        tenure: array().of(number("Must be a number").positive("Must > 0").integer("Must be a number").required("Required"))
      })).required(),
      bio: object({
        born: object({
          year: number().typeError("Must be a number").positive("Must > 0").integer("Must be a number").required("Required"),
          place: string()
        }),
        died: object({
          year: number().typeError("Must be a number").positive("Must > 0").integer("Must be a number").required("Required"),
          place: string()
        }),
        burial: object({
          date: string(),
          place: string()
        }),
        house: object({
          farther: string(),
          mother: string()
        })
      })
    });
    const initialData = {
      isFavorite: "false",
      name: "",
      imageURL: "https://via.placeholder.com/150",
      slug: "",
      positions: [{
        name: "",
        tenure: []
      }],
      bio: {
        born: {
          year: null,
          place: ""
        },
        died: {
          year: null,
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

    return {
      toastMessage: "",
      initialData,
      ...initialData,
      validateSchema
    };
  },
  //section Computed
  /*
  *    ____                            _           _
  *   / ___|___  _ __ ___  _ __  _   _| |_ ___  __| |
  *  | |   / _ \| '_ ` _ \| '_ \| | | | __/ _ \/ _` |
  *  | |__| (_) | | | | | | |_) | |_| | ||  __/ (_| |
  *   \____\___/|_| |_| |_| .__/ \__,_|\__\___|\__,_|
  *                       |_|
  */
  computed: {
    //For debug
    console: () => console
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
        positions: this.positions,
        bio: this.bio
      };

      //validate data
      // validateSchema.validate(data, {abortEarly: false})
      //     .then(async data =>
      //     {
      //       // Add a new document with a generated id.
      //       await addDoc(collection(db, "characters"), data);
      //       this.$refs.toast.showToast(`Successfully added a new character ${data.name}!`);
      //     })
      //     .catch(error =>
      //     {
      //       console.log("data", data);
      //       console.log(" error.name", error.name);
      //       console.log("error", error.errors);
      //     });
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
      this.positions.push({
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
      this.positions.splice(index, 1);
    },
    resetData()
    {
      Object.assign(this.$data, this.initialData);
    }
  }
};
</script>

<!-- section Styles -->
<style lang="scss" scoped>
.form-container {

  //Error style
  .error {
    &::placeholder {
      color: #e25858;

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  img {
    max-height: 150px;
    width: auto;
  }

  .input-group {
    &, .bio {
      span {
        min-width: 65px;
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
