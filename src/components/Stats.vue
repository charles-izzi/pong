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
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import WinRate from "./WinRate.vue";
import { default as StatsCalculator, IStat } from "../business/stats/stats";
import Player from "./Player.vue";

export default Vue.extend({
    components: {
        "win-rate": WinRate,
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