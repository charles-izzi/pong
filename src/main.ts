import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import Play from "./components/Play.vue";
const vco: any = require("v-click-outside");

Vue.use(VueAxios, axios);
Vue.use(vco);
Vue.component("play", Play);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
