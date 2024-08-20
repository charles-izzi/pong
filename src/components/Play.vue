<template>
    <div>
        <v-dialog
            v-model="$repo.state.play.play.showDialog"
            :scrollable="false"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    <span>Select Winner</span>
                </v-card-title>
                <players
                    dense
                    :players="playerIds"
                    :setSelected="selectWinner"
                    :getSelected="isWinnerSelected"
                    :selectColor="winnerColor"
                ></players>
                <v-card-actions>
                    <v-counter
                        control-variant="split"
                        :max="20"
                        :min="1"
                        v-model="$repo.state.play.play.match.matchCount"
                    ></v-counter>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="gray darken-1"
                        text
                        @click="$repo.commit.play.setShowPlayDialog(false)"
                        >Close</v-btn
                    >
                    <v-btn
                        class="ps-3"
                        color="green darken-1"
                        text
                        :disabled="!winnerPopulated"
                        @click="completeMatch()"
                        >Confirm</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showResults" :scrollable="false" max-width="500px">
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
                            <tr v-for="player in players" :key="player.id">
                                <td>{{ player.player }}</td>
                                <td
                                    :style="{
                                        color: !$repo.state.play.play.match.isPlayerWinner(
                                            player.id
                                        )
                                            ? 'red'
                                            : 'green',
                                    }"
                                >
                                    <span
                                        v-show="
                                            $repo.state.play.play.match.isPlayerWinner(
                                                player.id
                                            )
                                        "
                                        >+</span
                                    >
                                    <span
                                        v-show="
                                            !$repo.state.play.play.match.isPlayerWinner(
                                                player.id
                                            )
                                        "
                                        >-</span
                                    >
                                    {{ $repo.state.play.play.match.eloChange }}
                                </td>
                                <td>{{ player.elo }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="default" @click="showResults = false"
                        >OK</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Notification from "./Notification.vue";
    import Players from "./Players.vue";
    import { winnerColor } from "@/constants";

    @Component({
        components: {
            notification: Notification,
            players: Players,
        },
    })
    export default class Play extends Vue {
        winnerColor: string = winnerColor;

        showResults = false;
        eloChange = 0;

        get playerIds() {
            return [
                this.$repo.state.play.play.match?.player1?.id,
                this.$repo.state.play.play.match?.player2?.id,
            ];
        }

        get players() {
            return [
                this.$repo.state.play.play.match?.player1,
                this.$repo.state.play.play.match?.player2,
            ];
        }

        get winnerPopulated() {
            return this.$repo.state.play.play.match?.winnerId;
        }

        async completeMatch() {
            await this.$repo.dispatch.play.completeMatch();
            this.showResults = true;
        }
        isWinnerSelected(id: string) {
            return this.$repo.state.play.play.match.isPlayerWinner(id);
        }
        selectWinner(id: string) {
            this.$repo.commit.play.setWinner(id);
        }
    }
</script>
