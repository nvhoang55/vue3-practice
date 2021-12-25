import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
//Firebase
import "./Firebase/setup";
// import "./Firebase/InitializeData";
//Boostrap JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//Custom helper functions
import "./helper.js";

createApp(App).use(router).mount("#app");
