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
                    @contextmenu="showDeleteDialog(k)"
                >
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
            return [this.$store.state.deleteMatchKey];
        else
            return this.$store.getters.filteredMatches;
    }
    getPlayer(matchKey: string) {
        if (this.player1IsPlayer(matchKey))
            return this.$store.getters.match(matchKey).player1Name;
        return this.$store.getters.match(matchKey).player2Name;
    }
    getOpponent(matchKey: string) {
        if (this.player1IsPlayer(matchKey))
            return this.$store.getters.match(matchKey).player2Name;
        return this.$store.getters.match(matchKey).player1Name;
    }
    isWin(matchKey: string) {
        return (
            (this.player1IsPlayer(matchKey) &&
                this.$store.getters.match(matchKey).player1Wins) ||
            (!this.player1IsPlayer(matchKey) &&
                !this.$store.getters.match(matchKey).player1Wins)
        );
    }
    player1IsPlayer(matchKey: string) {
        return (
            !this.$store.state.matchesFilter.playerName ||
            this.$store.state.matchesFilter.playerName ===
                this.$store.getters.match(matchKey).player1Name
        );
    }
    showDeleteDialog(matchKey: string) {
        if (this.isDeleteDialog) return;
        this.$store.dispatch("setShowDeleteMatchDialog", true);
        this.$store.dispatch("setDeleteMatchKey", matchKey);
    }
}
</script>