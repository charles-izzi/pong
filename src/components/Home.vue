<template>
  <v-container ref="container">
    <v-row class="sticky" :style="{ width: stickyWidth + 'px' }">
      <v-col cols="12" style="padding:0; margin-top:-12px;">
        <v-card>
          <v-card-text>
            <v-row class="mx-1">
              <span class="headline" style="color: rgb(0,0,0,.82)"
                >Player Selection</span
              >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" class="ml-2" style="padding-bottom:6px;"
                    >mdi-help-circle-outline</v-icon
                  >
                </template>
                <ul>
                  <li>Select 1 to View Player Details</li>
                  <li>Select 2 to Play a Match</li>
                  <li>Select 3 or more to Create Matches</li>
                </ul>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-btn
                color="primary darken-1"
                text
                @click="$repo.commit.players.resetSelection()"
                >Clear</v-btn
              >
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="marginTop: 45px;">
      <v-col cols="12" style="padding-top:0;">
        <add-player></add-player>
        <players
          :players="$repo.getters.players.rankedPlayers"
          :setSelected="selectPlayer"
          :getSelected="$repo.getters.players.isPlayerSelected"
          :selectColor="selectedColor"
        ></players>
      </v-col>
    </v-row>
    <action></action>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AddPlayer from "./AddPlayer.vue";
import Players from "./Players.vue";
import Action from "./Action.vue";
import { selectedColor } from "@/constants";

@Component({
  components: {
    "add-player": AddPlayer,
    players: Players,
    action: Action
  }
})
export default class Home extends Vue {
  selectedColor: string = selectedColor;
  scrollTop = 0;
  stickyWidth = 0;
  selectPlayer(id: string) {
    this.$repo.dispatch.players.selectPlayer(id);
  }
  async mounted() {
    this.stickyWidth = (this.$refs.container as HTMLElement).clientWidth;
  }
}
</script>
<style scoped>
.sticky {
  position: fixed;
  top: 59px;
  width: 100%;
  z-index: 2;
}
</style>
