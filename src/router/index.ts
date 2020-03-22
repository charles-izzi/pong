import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import MatchHistory from "../components/MatchHistory.vue";
import MatchMaker from "../components/MatchMaker.vue";

Vue.use(VueRouter);

export const homeRoute = "/";
export const matchHistoryRoute = "/MatchHistory";
export const matchMakerRoute = "/MatchMaker";

const routes = [
    {
        path: homeRoute,
        name: "home",
        component: Home,
    },
    {
        path: matchHistoryRoute,
        name: "matchHistory",
        component: MatchHistory,
    },
    {
        path: matchMakerRoute,
        name: "matchMaker",
        component: MatchMaker,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
