<template>
    <div>
        <v-dialog v-model="$repo.state.play.play.showDialog" :scrollable="false" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>Select Winner</span>
                </v-card-title>
                <players
                    dense
                    :players="[
                        $repo.state.play.play.player1,
                        $repo.state.play.play.player2,
                    ]"
                    :setSelected="selectWinner"
                    :getSelected="this.$repo.getters.play.isPlayerWinner"
                    :selectColor="winnerColor"
                ></players>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="gray darken-1"
                        text
                        @click="$repo.commit.play.setShowPlayDialog(false)"
                    >Close</v-btn>
                    <v-btn
                        class="ps-3"
                        color="green darken-1"
                        text
                        :disabled="!$repo.state.play.play.winner"
                        @click="completeMatch()"
                    >Confirm</v-btn>
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
                            <tr
                                v-for="id in [
                                    $repo.state.play.play.player1,
                                    $repo.state.play.play.player2,
                                ]"
                                :key="id"
                            >
                                <td>
                                    {{
                                    $repo.getters.players.player(id).player
                                    }}
                                </td>
                                <td
                                    :style="{
                                        color: !$repo.getters.play.isPlayerWinner(
                                            id
                                        )
                                            ? 'red'
                                            : 'green',
                                    }"
                                >
                                    <span
                                        v-show="
                                            $repo.getters.play.isPlayerWinner(
                                                id
                                            )
                                        "
                                    >+</span>
                                    <span
                                        v-show="
                                            !$repo.getters.play.isPlayerWinner(
                                                id
                                            )
                                        "
                                    >-</span>
                                    {{ eloChange }}
                                </td>
                                <td>{{ $repo.getters.players.player(id).elo }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="default" @click="showResults = false">OK</v-btn>
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

    async completeMatch() {
        this.eloChange = await this.$repo.dispatch.play.completeMatch();
        this.showResults = true;
    }
    selectWinner(id: string) {
        this.$repo.commit.play.setWinner(id);
    }
}
</script>
