<template>
    <div>
        <v-row dense>
            <v-col cols="5">
                <win-rate
                    v-if="hasStat(stats.winRate)"
                    :win-rate="stats.winRate.winRate"
                    :win-count="stats.winRate.winCount"
                    :lose-count="stats.winRate.loseCount"
                ></win-rate>
            </v-col>
            <v-col cols="12">
                <fare-against
                    v-if="hasStrongStat"
                    :strong="true"
                    :playerFares="stats.fareAgainst.strong.fares"
                ></fare-against>
            </v-col>
            <v-col cols="12">
                <fare-against
                    v-if="hasWeakStat"
                    :strong="false"
                    :playerFares="stats.fareAgainst.weak.fares"
                ></fare-against>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import WinRate from "./stats/WinRate.vue";
import FareAgainst from "./stats/FareAgainst.vue";
import { default as StatsCalculator, IStat } from "../business/stats/stats";
import Player from "./Player.vue";

export default Vue.extend({
    components: {
        "win-rate": WinRate,
        "fare-against": FareAgainst,
    },
    props: {
        playerFilter: Object as () => Player,
        opponentFilter: Object as () => Player,
    },
    data() {
        return {
            stats: {} as StatsCalculator,
        };
    },
    computed: {
        hasStrongStat(): boolean {
            return this.hasStat(this.stats?.fareAgainst?.strong);
        },
        hasWeakStat(): boolean {
            return this.hasStat(this.stats?.fareAgainst?.weak);
        },
    },
    watch: {
        playerFilter() {
            this.recalculate();
        },
        opponentFilter() {
            this.recalculate();
        },
    },
    methods: {
        hasStat(stat: IStat) {
            return stat?.hasStat;
        },
        recalculate() {
            this.stats = new StatsCalculator(
                this.$repo.state.players.players,
                this.$repo.state.matchHistory.matches,
                this.playerFilter?.id,
                this.opponentFilter?.id
            );
        },
    },
    mounted() {
        this.recalculate();
    },
});
</script>