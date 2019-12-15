<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn @click="$router.push('/')" text>
        <span class="mr-2">Pong</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./components/Home.vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    //
  })
});
</script>
