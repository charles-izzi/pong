<template>
    <div>
        <v-card-title>
            <span class="headline">Match History</span>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-2 mb-2">mdi-help-circle-outline</v-icon>
                </template>
                Long press a match to prompt deletion
            </v-tooltip>
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
        <match-history-table style="width: 100%"></match-history-table>
        <action></action>
        <delete-match></delete-match>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Action from "./Action.vue";
import MatchHistoryTable from "./MatchHistoryTable.vue";
import DeleteMatch from "./DeleteMatch.vue";
import { IMatchesFilter } from "../business/playModel";
@Component({
    components: {
        action: Action,
        "match-history-table": MatchHistoryTable,
        "delete-match": DeleteMatch,
    }
})
export default class MatchHistory extends Vue {
    deleteMatchKey: string = "";
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