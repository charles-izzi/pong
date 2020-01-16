<template>
    <div>
        <v-fab-transition>
            <v-btn
                v-show="$store.getters.noPlayersSelected"
                @click="$store.dispatch('setShowAddDialog', true)"
                dark
                fab
                bottom
                right
                color="blue"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
        <v-fab-transition>
            <v-btn
                v-show="$store.getters.onePlayerSelected"
                @click="goToMatchHistory()"
                class="lighten-1"
                fab
                bottom
                right
                color="grey"
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-fab-transition>
        <v-fab-transition>
            <v-btn
                v-show="$store.getters.twoPlayersSelected"
                @click="$store.dispatch('setShowPlayDialog', true)"
                dark
                fab
                bottom
                right
                color="green"
            >
                <v-icon>mdi-table-tennis</v-icon>
            </v-btn>
        </v-fab-transition>
        <v-fab-transition>
            <v-btn
                v-show="$router.currentRoute.path === matchHistoryRoute"
                @click="goToHome()"
                class="lighten-1"
                fab
                bottom
                right
                color="grey"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-fab-transition>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { matchHistoryRoute, homeRoute } from "@/router";
@Component({})
export default class Action extends Vue {
    matchHistoryRoute: string = matchHistoryRoute;
    goToMatchHistory() {
        this.$store.dispatch("setMatchesFilter", {
            playerName: this.$store.state.players[
                this.$store.state.selectedPlayers[0]
            ].player
        });
        this.$router.push(matchHistoryRoute);
    }
    goToHome() {
        this.$store.dispatch("resetSelection");
        this.$router.push(homeRoute);
    }
}
</script>
<style scoped>
button.v-btn--fab {
    position: fixed;
    bottom: 8% !important;
    right: 5% !important;
    height: 60px !important;
    width: 60px !important;
}
.v-btn--fab .v-icon {
    height: 30px;
    font-size: 30px;
    width: 30px;
}
</style>