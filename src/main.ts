import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import Play from "./components/Play.vue";
import './registerServiceWorker'

Vue.component("play", Play);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.prototype.$repo = store;

new Vue({
    router,
    store: store.original,
    vuetify,
    render: h => h(App),
}).$mount("#app");
