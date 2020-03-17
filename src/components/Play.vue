<template>
  <div>
    <v-dialog
      v-model="$store.state.play.showDialog"
      :scrollable="false"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span>Select Winner</span>
        </v-card-title>
        <players
          dense
          :players="[$store.state.play.player1, $store.state.play.player2]"
          :setSelected="selectWinner"
          :getSelected="this.$store.getters.isPlayerWinner"
          :selectColor="winnerColor"
        ></players>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="gray darken-1"
            text
            @click="$store.dispatch('setShowPlayDialog', false)"
            >Close</v-btn
          >
          <v-btn
            class="ps-3"
            color="green darken-1"
            text
            :disabled="!$store.state.play.winner"
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
              <tr
                v-for="id in [
                  $store.state.play.player1,
                  $store.state.play.player2
                ]"
                :key="id"
              >
                <td>{{ $store.getters.player(id).player }}</td>
                <td
                  :style="{
                    color: !$store.getters.isPlayerWinner(id) ? 'red' : 'green'
                  }"
                >
                  <span v-show="$store.getters.isPlayerWinner(id)">+</span>
                  <span v-show="!$store.getters.isPlayerWinner(id)">-</span>
                  {{ eloChange }}
                </td>
                <td>{{ $store.getters.player(id).elo }}</td>
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
import { mapState } from "vuex";
import Component from "vue-class-component";
import Notification from "./Notification.vue";
import Players from "./Players.vue";
import { IPlayer, winnerColor, IPlayDialog } from "../business/playModel";

@Component({
  components: {
    notification: Notification,
    players: Players
  }
})
export default class Play extends Vue {
  winnerColor: string = winnerColor;

  showResults: boolean = false;
  eloChange = 0;

  async completeMatch() {
    this.eloChange = await this.$store.dispatch("completeMatch");
    this.showResults = true;
  }
  selectWinner(id: string) {
    this.$store.dispatch("setWinner", id);
  }
}
</script>
