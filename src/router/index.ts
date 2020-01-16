import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import MatchHistory from "../components/MatchHistory.vue";

Vue.use(VueRouter);

export const homeRoute = "/";
export const matchHistoryRoute = "/MatchHistory";

const routes = [
  {
    path: homeRoute,
    name: "home",
    component: Home
  },
  {
    path: matchHistoryRoute,
    name: "matchHistory",
    component: MatchHistory
  },
];

const router = new VueRouter({
  routes
});

export default router;
