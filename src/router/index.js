import {createRouter, createWebHistory} from "vue-router";
import AllCard from "../views/AllCards";
import AddCard from "../views/AddCard";

const routes = [
    {
        path: "/all",
        name: "AllCards",
        component: AllCard
    },
    {
        path: "/add ",
        name: "AddCard",
        component: AddCard
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
