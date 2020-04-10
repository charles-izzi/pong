<template>
    <v-container>
        <v-card-title>
            <span class="headline">Player Details</span>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on" class="ml-2 mb-2">mdi-help-circle-outline</v-icon>
                </template>
                Long press a match to prompt deletion
            </v-tooltip>
        </v-card-title>
        <v-row class="px-3">
            <v-col class="py-0 px-3">
                <v-select
                    v-model="playerFilterId"
                    label="Player"
                    :clearable="true"
                    :items="$repo.state.players.players.list"
                    item-value="id"
                    item-text="player"
                ></v-select>
            </v-col>
            <v-col class="py-0 px-3">
                <v-select
                    v-show="!!playerFilterId"
                    v-model="opponentFilterId"
                    label="Opponent"
                    :clearable="true"
                    :items="$repo.state.matchHistory.matches.getOpponents(playerFilterId)"
                    item-value="id"
                    item-text="player"
                ></v-select>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-expansion-panels accordion mandatory>
                <v-expansion-panel>
                    <v-expansion-panel-header>Stats</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <stats :player-filter="playerFilter" :opponent-filter="opponentFilter"></stats>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header>Match History</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <match-history
                            :player-filter="playerFilter"
                            :opponent-filter="opponentFilter"
                            style="width: 100%"
                        ></match-history>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        <action></action>
        <delete-dialog></delete-dialog>
    </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Action from "./Action.vue";
import MatchHistory from "./MatchHistory.vue";
import DeleteDialog from "./DeleteDialog.vue";
import Stats from "./Stats.vue";
@Component({
    components: {
        action: Action,
        "match-history": MatchHistory,
        "delete-dialog": DeleteDialog,
        stats: Stats,
    },
})
export default class PlayerDetails extends Vue {
    playerFilterId = "";
    opponentFilterId = "";
    get playerFilter() {
        if (!this.playerFilterId || !this.$repo.state.players.players?.hash)
            return null;
        return this.$repo.state.players.players.hash[this.playerFilterId];
    }
    get opponentFilter() {
        if (!this.opponentFilterId || !this.$repo.state.players.players?.hash)
            return null;
        return this.$repo.state.players.players.hash[this.opponentFilterId];
    }
    async mounted() {
        await this.$repo.dispatch.players.loadPlayers();
        this.$repo.dispatch.matchHistory.fetchMatches();
        if (this.$repo.getters.players.onePlayerSelected)
            this.playerFilterId = this.$repo.state.players.selectedPlayers[0];
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
