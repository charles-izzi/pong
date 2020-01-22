<template>
    <div>
        <v-dialog v-model="$store.state.showPlayDialog" :scrollable="false" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Select Winner</span>
                </v-card-title>
                <players
                    dense
                    :players="$store.state.selectedPlayers"
                    :select="selectWinner"
                    :selected="$store.getters.isPlayerWinner"
                    :selectColor="winnerColor"
                ></players>                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gray darken-1" text @click="close()">Close</v-btn>
                    <v-btn
                        class="ps-3"
                        color="green darken-1"
                        text
                        :disabled="!$store.state.winner"
                        @click="completeMatch()"
                    >Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="results" :scrollable="false" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Results</span>
                </v-card-title>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Player</th>
                                <th class="text-left">Change</th>
                                <th class="text-left">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(player, i) in [player1, player2]" :key="player.player">
                                <td>{{ player.player }}</td>
                                <td :style="{color: showNegative(i) ? 'red' : 'green'}">
                                    <span v-show="!showNegative(i)">+</span>
                                    <span v-show="showNegative(i)">-</span>
                                    {{ eloChange }}
                                </td>
                                <td>{{ player.elo }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="default" @click="closeResults()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Component from "vue-class-component";
import Notification from "./Notification.vue";
import Players from "./Players.vue";
import { IPlayer, winnerColor } from "../business/playModel";

@Component({
    components: {
        notification: Notification,
        players: Players
    }
})
export default class Play extends Vue {
    createWarning: boolean = false;
    dialog: boolean = false;
    results: boolean = false;
    player1Id = "";
    player2Id = "";
    player1 = {} as IPlayer;
    player2 = {} as IPlayer;
    player1Wins: boolean = true;
    eloChange = 0;
    winnerColor: string = winnerColor;

    showNegative(ix: number) {
        return (
            (!this.player1Wins && ix === 0) || (this.player1Wins && ix === 1)
        );
    }
    async completeMatch() {
        this.eloChange = await this.$store.dispatch("play");
        this.player1Wins = this.$store.state.winner === this.player1Id;
        this.close();
        this.results = true;
    }
    close() {
        this.$store.dispatch("setShowPlayDialog", false);
        this.$store.dispatch("setWinner", "");
        this.$store.dispatch("resetSelection");
    }
    closeResults() {
        this.results = false;
    }
    selectWinner(id: string) {
        this.$store.dispatch("setWinner", id);
    }
    mounted() {
        this.$store.watch(
            (state, getters) => state.showPlayDialog,
            (newValue, oldValue) => {
                if (newValue) {
                    this.player1Id = this.$store.state.selectedPlayers[0];
                    this.player1 = this.$store.state.players[this.player1Id];
                    this.player2Id = this.$store.state.selectedPlayers[1];
                    this.player2 = this.$store.state.players[this.player2Id];
                }
            }
        );
    }
}
</script>