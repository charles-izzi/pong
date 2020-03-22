<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-show="$repo.getters.players.onePlayerSelected"
        @click="goToMatchHistory()"
        dark
        fab
        bottom
        right
        color="blue"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="$repo.getters.players.twoPlayersSelected"
        @click="playMatch"
        dark
        fab
        bottom
        right
        color="green"
      >
        <v-icon>mdi-table-tennis</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="
          $router.currentRoute.path === homeRoute &&
            $repo.getters.players.moreThanTwoPlayersSelected
        "
        @click="showMatchMakerMenu = true"
        dark
        fab
        bottom
        right
        color="orange"
      >
        <v-icon color="black">mdi-tournament</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="$router.currentRoute.path === matchHistoryRoute"
        @click="goToHome()"
        class="lighten-1"
        fab
        bottom
        right
        color="grey"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="$router.currentRoute.path === matchMakerRoute && !overlay"
        @click="goToHome()"
        dark
        fab
        bottom
        right
        color="blue"
      >
        <v-icon>mdi-account-switch</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="$router.currentRoute.path === matchMakerRoute && overlay"
        @click="$emit('cancel-overlay')"
        class="lighten-2"
        fab
        bottom
        right
        color="grey"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-fab-transition>
    <match-maker-menu
      :show="showMatchMakerMenu"
      @menu-complete="showMatchMakerMenu = false"
    ></match-maker-menu>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { matchHistoryRoute, homeRoute, matchMakerRoute } from "@/router";
import { IPlayDialog } from "@/store/play";
import MatchMakerMenu from "./MatchMakerMenu.vue";
@Component({
  props: {
    overlay: Boolean
  },
  components: {
    "match-maker-menu": MatchMakerMenu
  }
})
export default class Action extends Vue {
  matchHistoryRoute: string = matchHistoryRoute;
  matchMakerRoute: string = matchMakerRoute;
  homeRoute: string = homeRoute;
  showMatchMakerMenu: boolean = false;
  playMatch() {
    this.$repo.commit.play.setPlay({
      player1: this.$repo.state.players.selectedPlayers[0],
      player2: this.$repo.state.players.selectedPlayers[1],
      winner: "",
      showDialog: true,
      callback: () => this.$repo.commit.players.resetSelection()
    });
  }
  goToMatchHistory() {
    this.$repo.commit.matchHistory.setMatchesFilter({
      playerName: this.$repo.getters.players.player(
        this.$repo.state.players.selectedPlayers[0]
      ).player
    });
    this.$router.push(matchHistoryRoute);
  }
  goToHome() {
    this.$router.push(homeRoute);
  }
}
</script>
<style scoped>
button.v-btn--fab {
  position: fixed;
  bottom: 8% !important;
  right: 5% !important;
  height: 60px !important;
  width: 60px !important;
  z-index: 2;
}
.v-btn--fab .v-icon {
  height: 30px;
  font-size: 30px;
  width: 30px;
}
</style>
