import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
//Firebase
import "./Firebase/setup";

import "bootstrap/dist/js/bootstrap.bundle.min";

import "./helper.js";

createApp(App).use(router).mount("#app");
