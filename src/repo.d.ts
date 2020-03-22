import Vue from "vue";
import store from "./store/index";

declare module "vue/types/vue" {
    interface Vue {
        $repo: typeof store;
    }
}
