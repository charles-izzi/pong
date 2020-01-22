<template>
    <v-app>
        <v-app-bar app color="primary" dark dense>
            <v-btn @click="$router.push(homeRoute)" text>
                <span class="mr-2">Pong</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="goToMatchHistory()">
                        <v-list-item-title>Match History</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./components/Home.vue";
import Component from "vue-class-component";
import { matchHistoryRoute, homeRoute } from "./router";

@Component({})
export default class App extends Vue {
    homeRoute: string = homeRoute;
    goToMatchHistory() {
        this.$store.dispatch("setMatchesFilter", {});
        this.$router.push(matchHistoryRoute);
    }
}
</script>
