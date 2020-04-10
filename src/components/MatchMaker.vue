<template>
    <v-container>
        <v-card-title>
            <span class="headline">Match Maker</span>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on" class="ml-2 mb-2">mdi-help-circle-outline</v-icon>
                </template>
                Matches are made by
                <ol>
                    <li>Equal play</li>
                    <li>Distinct matches</li>
                    <li>Minimizing player rating differential</li>
                </ol>
                <br />
                <hr style="width: 50%;" />
                <br />
                <ul>
                    <li>Click a player to complete a match</li>
                    <li>Click an Up-Next match to move it to Playing-Now</li>
                    <li>Click the group-transfer button to adjust player pool</li>
                </ul>
            </v-tooltip>
        </v-card-title>
        <div class="text-right">
            <v-card-title class="subtitle-1" style="padding-bottom: 0;">Playing Now</v-card-title>
            <versus
                v-for="(val, i) in $repo.state.matchMaker.activeMatches"
                :key="i"
                :match="val"
                :readonly="overlay"
                :elevate="overlay"
                @click="swapActive(val)"
                class="my-1"
                :zIndex="1"
            ></versus>
        </div>
        <v-card-title class="subtitle-1" style="padding-bottom: 0;">Up Next</v-card-title>
        <versus
            v-for="(val, i) in upNextMatches"
            :key="i"
            :match="val"
            :readonly="true"
            @click="upNextClick(val)"
            :zIndex="val === swapMatch ? 1 : 0"
            :selected="val === swapMatch && overlay"
            class="my-1"
        ></versus>

        <v-overlay :z-index="0" :value="overlay"></v-overlay>
        <action :overlay="overlay" @cancel-overlay="overlay = false"></action>
    </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Versus from "./Versus.vue";
import Action from "./Action.vue";
import { Match } from "@/business/matchMaking/match";

@Component({
    components: {
        versus: Versus,
        action: Action,
    },
})
export default class MatchMaker extends Vue {
    overlay = false;
    zIndex: number[] = new Array(6);
    swapMatch: Match | null = null;
    get upNextMatches() {
        return this.matches.filter(
            x => !this.$repo.state.matchMaker.activeMatches.includes(x)
        );
    }
    get matches() {
        if (!this.$repo.state.matchMaker.matchMaker.getMatches) return [];
        const matches = this.$repo.state.matchMaker.matchMaker.getMatches();
        return matches;
    }
    getZIndex(i: number) {
        this.zIndex[i] ? 0 : this.zIndex[i];
    }
    upNextClick(val: Match) {
        this.overlay = !this.overlay;
        this.swapMatch = val;
    }
    swapActive(val: Match) {
        if (!this.overlay || !this.swapMatch) return;
        this.$repo.state.matchMaker.activeMatches.splice(
            this.$repo.state.matchMaker.activeMatches.indexOf(val),
            1,
            this.swapMatch
        );
        this.$repo.commit.matchMaker.setActiveMatches(
            this.$repo.state.matchMaker.activeMatches
        );
        this.overlay = false;
    }
}
</script>
