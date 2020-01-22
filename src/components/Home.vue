<template>
    <v-container>
        <v-row class="sticky">
            <v-col cols="12" style="padding:0; margin-top:-12px;">
                <v-card>
                    <v-card-text>
                        <v-row class="mx-1">
                            <span class="headline" style="color: rgb(0,0,0,.82)">Player Selection</span>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-icon
                                        v-on="on"
                                        class="ml-2"
                                        style="padding-bottom:6px;"
                                    >mdi-help-circle-outline</v-icon>
                                </template>
                                <ul>
                                    <li>Select 0 to Add a Player</li>
                                    <li>Select 1 to View Player Details</li>
                                    <li>Select 2 to Play a Match</li>
                                </ul>
                            </v-tooltip>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary darken-1"
                                text
                                @click="$store.dispatch('resetSelection')"
                            >Clear</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-col cols="12" style="padding-top:0;">
                    <players
                        :players="$store.state.selectedPlayers"
                        :select="selectPlayer"
                        :selected="$store.getters.isPlayerSelected"
                        :selectColor="selectedColor"
                    ></players>
                </v-col>
            </v-col>
        </v-row>
        <v-row :style="{ marginTop: marginTop + 'px' }">
            <v-col cols="12" style="padding-top:0;">
                <add-player></add-player>
                <play></play>
                <players
                    :players="$store.getters.unselectedRankedPlayers"
                    :select="selectPlayer"
                    :selected="$store.getters.isPlayerSelected"
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
import Play from "./Play.vue";
import Players from "./Players.vue";
import Action from "./Action.vue";
import { selectedColor } from "@/business/playModel";

@Component({
    components: {
        "add-player": AddPlayer,
        play: Play,
        players: Players,
        action: Action
    }
})
export default class Home extends Vue {
    selectedColor: string = selectedColor;
    scrollTop: number = 0;
    selectPlayer(id: string) {
        this.$store.dispatch("selectPlayer", id);
    }
    get marginTop() {
        return this.$store.state.selectedPlayers.length * 42 + 45;
    }
    async mounted() {
        await this.$store.dispatch("fetchPlayers");
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
