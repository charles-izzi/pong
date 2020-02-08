<template>
    <div>
        <v-card-title>
            <span class="headline">Match Maker</span>
            <!-- <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-2 mb-2">mdi-help-circle-outline</v-icon>
                </template>
                Long press a match to prompt deletion
            </v-tooltip> -->
        </v-card-title>
        <v-card class="text-right">
            <v-card-title class="subtitle-1">Playing Now</v-card-title>
            <versus
                v-for="(val, i) in $store.state.activeMatches"
                :key="i"
                :match="val"
            ></versus>
        </v-card>
        <v-card style="margin-top:5px;">
            <v-card-title class="subtitle-1">Up Next</v-card-title>
            <versus
                v-for="(val, i) in upNextMatches"
                :key="i"
                :match="val"
            ></versus>
        </v-card>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Versus from "./Versus.vue";
import Play from "./Player.vue";
import { MatchMaker as MatchMakerService, IMatch } from "@/business/matchMaker";

@Component({
    components: {
        versus: Versus,
        play: Play
    }
})
export default class MatchMaker extends Vue {
    matches: IMatch[] = [];
    get upNextMatches() {
        return this.matches.filter(x => !this.$store.state.activeMatches.includes(x));
    }
    getNextMatches() {
        this.matches = this.$store.state.matchMaker.getMatches();
    }    
    async mounted() {
        if (!Object.keys(this.$store.state.players).length) 
            await this.$store.dispatch("fetchPlayers");
        if (!Object.keys(this.$store.state.matchMaker).length)
            this.$store.dispatch("setMatchMaker", new MatchMakerService(this.$store.state.players, 6));
        this.$store.state.matchMaker.setPlayers(
            new Set(this.$store.state.selectedPlayers),
            this.$store.state.activeMatches
        );
        this.getNextMatches();
        if (this.$store.state.activeMatches.length === 0)
            this.$store.dispatch("setActiveMatches", this.matches.slice(0, 2));

        // this.$store.watch(
        //     (state) => state.matchMakerPlayed,
        //     (newValue) => {
        //         if (newValue)
        //             this.$store.state.matchMaker.playMatch(this.match);                
        //     }
        // );
    }
}
</script>