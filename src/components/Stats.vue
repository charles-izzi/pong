<template>
    <div class="stats">
        <v-row dense>
            <v-col cols="4">
                <win-rate
                    v-if="hasStat(stats.winRate)"
                    :win-rate="stats.winRate.winRate"
                    :win-count="stats.winRate.winCount"
                    :lose-count="stats.winRate.loseCount"
                ></win-rate>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <number-stat
                    v-if="hasWinStreakStat"
                    title="Win Streak"
                    subtitle="Games"
                    :value="stats.streak.win.stat"
                ></number-stat>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <number-stat
                    v-if="hasLoseStreakStat"
                    title="Lose Streak"
                    subtitle="Games"
                    :value="stats.streak.lose.stat"
                ></number-stat>
            </v-col>
            <v-col cols="6">
                <number-stat
                    v-if="hasBestWinStat"
                    title="Best Win"
                    :subtitle="$repo.state.players.players.getName(stats.maxRating.win.opponentId)"
                    :second-subtitle="stats.maxRating.win.timestamp | date"
                    :value="stats.maxRating.win.elo"
                    dense
                ></number-stat>
            </v-col>
            <v-col cols="6">
                <number-stat
                    v-if="hasWorstLossStat"
                    title="Worst Loss"
                    :subtitle="$repo.state.players.players.getName(stats.maxRating.loss.opponentId)"
                    :second-subtitle="stats.maxRating.loss.timestamp | date"
                    :value="stats.maxRating.loss.elo"
                    dense
                ></number-stat>
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
import NumberStat from "./stats/NumberStat.vue";
import { default as StatsCalculator, IStat } from "../business/stats/stats";
import Player from "./Player.vue";

export default Vue.extend({
    components: {
        "win-rate": WinRate,
        "fare-against": FareAgainst,
        "number-stat": NumberStat,
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
        hasWinStreakStat(): boolean {
            return this.hasStat(this.stats?.streak?.win);
        },
        hasLoseStreakStat(): boolean {
            return this.hasStat(this.stats?.streak?.lose);
        },
        hasBestWinStat(): boolean {
            return this.hasStat(this.stats?.maxRating?.win);
        },
        hasWorstLossStat(): boolean {
            return this.hasStat(this.stats?.maxRating?.loss);
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
<style>
.stats .v-card__title {
    padding-top: 5px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 0;
    font-size: 0.95rem !important;
    font-weight: 450;
    line-height: 1.5rem;
    letter-spacing: 0.0125em !important;
    font-family: "Roboto", sans-serif !important;
}
.stats .v-card__text {
    padding-bottom: 0;
}
.stats .v-card__subtitle {
    padding: 0 8px;
}
.stats .col {
    padding: 3px !important;
}
</style>