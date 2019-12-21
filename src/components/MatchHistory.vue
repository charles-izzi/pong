<template>
  <v-card>
    <v-card-title>
      <span class="headline">Match History</span>
    </v-card-title>
    <v-row class="px-3">
      <v-col class="py-0 px-3">
        <v-select
          v-model="playerFilter"
          label="Player"
          :clearable="true"
          :items="$store.getters.dropdownPlayersList"
        ></v-select>
      </v-col>
      <v-col class="py-0 px-3">
        <v-select
          v-show="!!playerFilter"
          v-model="opponentFilter"
          label="Opponent"
          :clearable="true"
          :items="$store.getters.dropdownPlayersList"
        ></v-select>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Player</th>
            <th class="text-left">Opponent</th>
            <th class="text-center">Win/Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="k in $store.getters.filteredMatches" :key="k" v-longpress="deleteMatch(k)">
            <td>{{getPlayer(k)}}</td>
            <td>{{getOpponent(k)}}</td>
            <td
              :class="{'text-center': true, 
                'red--text': !isWin(k), 'text--darken-4': !isWin(k), 
                'green--text': isWin(k), 'text--darken-4': isWin(k)}"
            >{{isWin(k) ? 'Win' : 'Loss'}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-fab-transition>
      <v-btn @click="goHome()" class="lighten-3" fab bottom right color="grey">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IMatchesFilter } from "../business/playModel";
@Component({})
export default class MatchHistory extends Vue {
  get playerFilter() {
    return this.$store.state.matchesFilter.playerName;
  }
  set playerFilter(val: string) {
    this.$store.dispatch("setMatchesFilter", {
      playerName: val,
      opponentName: this.opponentFilter
    } as IMatchesFilter);
  }
  get opponentFilter() {
    return this.$store.state.matchesFilter.opponentName;
  }
  set opponentFilter(val: string) {
    this.$store.dispatch("setMatchesFilter", {
      playerName: this.playerFilter,
      opponentName: val
    } as IMatchesFilter);
  }
  mounted() {
    if (!Object.keys(this.$store.state.players).length)
      this.$store.dispatch("fetchPlayers");
    this.$store.dispatch("fetchMatches");
  }
  getPlayer(matchKey: string) {
    if (this.player1IsPlayer(matchKey))
      return this.$store.state.matches[matchKey].player1Name;
    return this.$store.state.matches[matchKey].player2Name;
  }
  getOpponent(matchKey: string) {
    if (this.player1IsPlayer(matchKey))
      return this.$store.state.matches[matchKey].player2Name;
    return this.$store.state.matches[matchKey].player1Name;
  }
  isWin(matchKey: string) {
    return (
      (this.player1IsPlayer(matchKey) &&
        this.$store.state.matches[matchKey].player1Wins) ||
      (!this.player1IsPlayer(matchKey) &&
        !this.$store.state.matches[matchKey].player1Wins)
    );
  }
  player1IsPlayer(matchKey: string) {
    return (
      !this.$store.state.matchesFilter.playerName ||
      this.$store.state.matchesFilter.playerName ===
        this.$store.state.matches[matchKey].player1Name
    );
  }
  deleteMatch(matchKey: string) {
      
  }
  goHome() {
      this.$store.dispatch('resetSelection');
      this.$router.push('/');
  }
}
</script>
<style scoped>
button.v-btn--fab {
  position: fixed;
  bottom: 5% !important;
  right: 7% !important;
  height: 75px !important;
  width: 75px !important;
}
.v-btn--fab .v-icon {
  height: 38px;
  font-size: 38px;
  width: 38px;
}
</style>