<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-btn @click="$router.push(homeRoute)" text>
        <span class="mr-2">Pong</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$store.dispatch('setShowAddDialog', true)">
            <v-list-item-title>Add Player</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="goToMatchHistory()">
            <v-list-item-title>Match History</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <play></play>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./components/Home.vue";
import Component from "vue-class-component";
import { matchHistoryRoute, homeRoute } from "./router";

@Component({})
export default class App extends Vue {
  homeRoute: string = homeRoute;
  goToMatchHistory() {
    this.$store.dispatch("setMatchesFilter", {});
    this.$router.push(matchHistoryRoute);
  }
  async mounted() {
    if (!Object.keys(this.$store.state.players).length)
      this.$store.dispatch("fetchPlayers");
  }
}
</script>
