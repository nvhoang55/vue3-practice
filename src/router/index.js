import {createRouter, createWebHistory} from "vue-router";
import AllCard from "../views/AllCards";
import AddCard from "../views/AddCard";
import Detail from "../views/Detail";
import NotFound from "@/views/NotFound";

const routes = [
    //section Routes
    /*
    *   ____             _
    *  |  _ \ ___  _   _| |_ ___  ___
    *  | |_) / _ \| | | | __/ _ \/ __|
    *  |  _ < (_) | |_| | ||  __/\__ \
    *  |_| \_\___/ \__,_|\__\___||___/
    *
    */
    {
        path: "/all",
        name: "AllChar",
        component: AllCard
    },
    {
        path: "/add",
        name: "AddChar",
        component: AddCard
    },
    {
        path: "/detail/:slug",
        name: "Detail",
        component: Detail,
        props: true
    },
    //section Redirect
    /*
    *   ____          _ _               _
    *  |  _ \ ___  __| (_)_ __ ___  ___| |_
    *  | |_) / _ \/ _` | | '__/ _ \/ __| __|
    *  |  _ <  __/ (_| | | | |  __/ (__| |_
    *  |_| \_\___|\__,_|_|_|  \___|\___|\__|
    *
    */
    {
        path: "/",
        redirect: "/all"
    },
    //section 404
    /*
    *   _  _    ___  _  _
    *  | || |  / _ \| || |
    *  | || |_| | | | || |_
    *  |__   _| |_| |__   _|
    *     |_|  \___/   |_|
    *
    */
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
