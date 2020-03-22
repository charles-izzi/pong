<template>
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
        <tr
          v-for="k in matches"
          :key="k"
          @contextmenu.stop="showDeleteDialog(k)"
        >
          <td>{{ getPlayer(k) }}</td>
          <td>{{ getOpponent(k) }}</td>
          <td
            :class="{
              'text-center': true,
              'red--text': !isWin(k),
              'text--darken-4': !isWin(k),
              'green--text': isWin(k),
              'text--darken-4': isWin(k)
            }"
          >
            {{ isWin(k) ? "Win" : "Loss" }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  props: {
    isDeleteDialog: Boolean
  }
})
export default class MatchHistoryTable extends Vue {
  isDeleteDialog!: boolean;
  get matches() {
    if (this.isDeleteDialog)
      return [this.$repo.state.matchHistory.deleteMatchKey];
    else return this.$repo.getters.matchHistory.filteredMatches;
  }
  getPlayer(matchKey: string) {
    if (this.player1IsPlayer(matchKey))
      return this.$repo.getters.matchHistory.match(matchKey).player1Name;
    return this.$repo.getters.matchHistory.match(matchKey).player2Name;
  }
  getOpponent(matchKey: string) {
    if (this.player1IsPlayer(matchKey))
      return this.$repo.getters.matchHistory.match(matchKey).player2Name;
    return this.$repo.getters.matchHistory.match(matchKey).player1Name;
  }
  isWin(matchKey: string) {
    return (
      (this.player1IsPlayer(matchKey) &&
        this.$repo.getters.matchHistory.match(matchKey).player1Wins) ||
      (!this.player1IsPlayer(matchKey) &&
        !this.$repo.getters.matchHistory.match(matchKey).player1Wins)
    );
  }
  player1IsPlayer(matchKey: string) {
    return (
      !this.$repo.state.matchHistory.matchesFilter.playerName ||
      this.$repo.state.matchHistory.matchesFilter.playerName ===
        this.$repo.getters.matchHistory.match(matchKey).player1Name
    );
  }
  showDeleteDialog(matchKey: string) {
    if (this.isDeleteDialog) return;
    this.$repo.commit.matchHistory.setShowDeleteMatchDialog(true);
    this.$repo.commit.matchHistory.setDeleteMatchKey(matchKey);
  }
}
</script>
