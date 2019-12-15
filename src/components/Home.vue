<template>
  <v-container>
    <v-row>
      <v-row class="mx-7 mt-2">
        <span class="headline">Player Selection</span>
        <v-tooltip v-model="showHelp" bottom>
          <template>
            <v-icon @click="showHelp = !showHelp" v-click-outside="hideHelp" class="ml-2 mb-2">mdi-help-circle-outline</v-icon>
          </template>
          <ul>
            <li>Select 0 to Add a Player</li>
            <li>Select 1 to View Player Details</li>
            <li>Select 2 to Play a Match</li>
          </ul>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="$store.dispatch('resetSelection')">Clear</v-btn>
      </v-row>
      <v-col cols="12">
        <add-player></add-player>
        <play></play>
        <players></players>
        <action></action>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AddPlayer from "./AddPlayer.vue";
import Play from "./Play.vue";
import Players from "./Players.vue";
import Action from "./Action.vue";

@Component({
  components: {
    "add-player": AddPlayer,
    play: Play,
    players: Players,
    action: Action
  }
})
export default class Home extends Vue {
  userName: string = "";
  showHelp: boolean = false;
  hideHelp() {
      this.showHelp = false;
  }
}
</script>
