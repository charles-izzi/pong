<template>
    <v-card
        @click="$emit('click')"
        :style="{ 'z-index': zIndex, 'box-shadow': elevationStyle }"
        :color="selected ? selectedColor : null"
    >
        <v-row dense class="mx-1">
            <v-col>
                <div v-if="readonly">
                    <versus-player :playerId="match.player1Id"></versus-player>
                </div>
                <v-card @click="playMatch(match.player1Id)" v-else>
                    <versus-player :playerId="match.player1Id"></versus-player>
                </v-card>
            </v-col>
            <span class="px-2 my-auto">vs</span>
            <v-col>
                <div v-if="readonly">
                    <versus-player
                        :playerId="match.player2Id"
                        :alignRight="true"
                    ></versus-player>
                </div>
                <v-card @click="playMatch(match.player2Id)" v-else>
                    <versus-player
                        :playerId="match.player2Id"
                        :alignRight="true"
                    ></versus-player>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { selectedColor } from "@/constants";
    import VersusPlayer from "./VersusPlayer.vue";
    import { Match as PlannedMatch } from "@/business/matchMaking/match";
    import Match from "@/business/play/match";

    @Component({
        components: {
            VersusPlayer,
        },
        props: {
            match: Object,
            readonly: Boolean,
            zIndex: Number,
            selected: Boolean,
            elevate: Boolean,
        },
    })
    export default class Versus extends Vue {
        match!: PlannedMatch;
        readonly!: boolean;
        elevate!: boolean;
        selectedColor: string = selectedColor;
        get player1() {
            return this.$repo.state.players.players.hash[this.match.player1Id];
        }
        get player2() {
            return this.$repo.state.players.players.hash[this.match.player2Id];
        }
        get elevationStyle() {
            if (!this.elevate) return null;
            return `0 0 5px 5px ${selectedColor}`;
        }
        playMatch(winnerId: string) {
            if (this.readonly) return;
            this.$repo.commit.play.setPlay({
                match: new Match(
                    this.$repo.state.players.players.hash[this.match.player1Id],
                    this.$repo.state.players.players.hash[this.match.player2Id],
                    winnerId
                ),
                showDialog: true,
                callback: this.onMatchComplete,
                matchCount: 1,
            });
            this.$emit("match-played", this.match);
        }
        onMatchComplete() {
            this.$repo.dispatch.matchMaker.removeActiveMatch(this.match);
            this.$repo.state.matchMaker.matchMaker.playMatch(this.match);
            this.$repo.dispatch.matchMaker.loadActiveMatches();
        }
    }
</script>
