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
                    v-for="match in matches"
                    :key="matchId(match)"
                    @contextmenu.stop="showDeleteDialog(match)"
                >
                    <td>{{ getPlayer(match).player }}</td>
                    <td>{{ getOpponent(match).player }}</td>
                    <td
                        :class="{
            'text-center': true,
            'red--text': !isWin(match),
            'text--darken-4': !isWin(match),
            'green--text': isWin(match),
            'text--darken-4': isWin(match)
            }"
                    >{{ isWin(match) ? "Win" : "Loss" }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Player from "@/business/data/player";
import RecordedMatch from "@/business/data/recordedMatch";
@Component({
    props: {
        isDeleteDialog: Boolean,
        playerFilter: Player,
        opponentFilter: Player,
    },
})
export default class MatchHistory extends Vue {
    isDeleteDialog!: boolean;
    playerFilter!: Player;
    opponentFilter!: Player;
    get matches() {
        if (this.isDeleteDialog) {
            if (!this.$repo.state.matchHistory.deleteDialog.match?.id)
                return [];
            return [
                this.$repo.state.matchHistory.matches.hash[
                    this.$repo.state.matchHistory.deleteDialog.match.id
                ],
            ];
        } else if (!this.playerFilter)
            return this.$repo.state.matchHistory.matches.getMatches();
        else if (!this.opponentFilter)
            return this.$repo.state.matchHistory.matches.getMatchesByPlayer(
                this.playerFilter.id
            );
        else
            return this.$repo.state.matchHistory.matches.getMatchesByPlayerAndOpponent(
                this.playerFilter.id,
                this.opponentFilter.id
            );
    }
    getPlayer(match: RecordedMatch) {
        if (this.playerFilter) return this.playerFilter;
        return this.$repo.getters.matchHistory.matchPlayer1(match.id);
    }
    getOpponent(match: RecordedMatch) {
        if (this.opponentFilter) return this.opponentFilter;
        if (
            this.playerFilter &&
            this.$repo.state.matchHistory.matches.hash[match.id].player1 !==
                this.playerFilter.id
        )
            return this.$repo.getters.matchHistory.matchPlayer1(match.id);
        return this.$repo.getters.matchHistory.matchPlayer2(match.id);
    }
    isWin(match: RecordedMatch) {
        if (
            this.getPlayer(match).id ===
            this.$repo.state.matchHistory.matches.hash[match.id].player1
        )
            return this.$repo.state.matchHistory.matches.hash[match.id]
                .player1Wins;
        return !this.$repo.state.matchHistory.matches.hash[match.id]
            .player1Wins;
    }
    showDeleteDialog(match: RecordedMatch) {
        if (this.isDeleteDialog) return;
        this.$repo.commit.matchHistory.showDeleteDialog(match);
    }
    matchId(match: RecordedMatch) {
        return match.id;
    }
}
</script>
