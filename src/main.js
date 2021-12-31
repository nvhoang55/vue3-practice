import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
//Firebase
import "./Firebase/setup";
//Boostrap JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//Custom helper functions
import "./helper.js";
//Vuestic
import {VuesticPlugin} from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";
import "./assets/styles/vuestic-override.css";
//Vuex
import store from "./store";

createApp(App)
    .use(router)
    .use(VuesticPlugin, {
        components: {
            VaButton: {
                rounded: false
            }
        }
    })
    .use(store)
    .mount("#app");
