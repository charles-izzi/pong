<template>
    <v-row dense class="mx-1">
        <v-col>
            <v-card @click="playMatch(match.player1Id)">
                <v-row>                    
                    <v-col align="left" class="dense-col" style="padding-right:0;">
                        <v-card-text class="headline grey--text text--darken-1">{{player1.rank}}</v-card-text>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" align="right" class="dense-col" style="padding-left:0;">
                        <div class="subtitle-1 card-text-sized grey--text text--darken-3">{{player1.player}}</div>
                        <v-card-subtitle class="card-subtitle-sized">{{player1.elo}}</v-card-subtitle>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <span class="px-2 my-auto">vs</span>
        <v-col>
            <v-card @click="playMatch(match.player2Id)">
                <v-row>
                    <v-col cols="auto" align="left" class="dense-col" style="padding-right:0;">
                        <div class="subtitle-1 card-text-sized grey--text text--darken-3">{{player2.player}}</div>
                        <v-card-subtitle class="card-subtitle-sized">{{player2.elo}}</v-card-subtitle>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col align="right" class="dense-col" style="padding-left:0;">
                        <v-card-text class="headline grey--text text--darken-1">{{player2.rank}}</v-card-text>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IMatch } from '../business/matchMaker';
import { winnerColor, IPlayDialog } from '../business/playModel';

@Component({
    props: {
        match: Object,
    }
})
export default class Versus extends Vue {
    match!: IMatch;
    get player1() {
        return this.$store.getters.player(this.match.player1Id);
    }
    get player2() {
        return this.$store.getters.player(this.match.player2Id);
    }
    playMatch(winnerId: string) {
        this.$store.dispatch("setPlay", {
            player1: this.match.player1Id,
            player2: this.match.player2Id,
            winner: winnerId,
            showDialog: true
        } as IPlayDialog);
        this.$store.dispatch('setMatchMakerPlayed', false);                
    }
}
</script>
<style scoped>
.card-text-sized {
    padding: 2px 10px 0px;
}
.card-subtitle-sized {
    padding: 0px 10px 2px;
}
.dense-col {
    padding-top: 0;
    padding-bottom: 0;
}
</style>