<template>
    <v-row>
        <v-col 
        cols="12"
        v-for="(val, i) in $store.getters.rankedPlayers"
        :key="val"
        style="padding: 0px 0px;">
            <player :id="val" :name="$store.state.players[val].player" :elo="$store.state.players[val].elo" :rank="i+1" :playing="false"></player>
        </v-col>
    </v-row>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { IPlayers } from "../business/playModel";
    import Player from './Player.vue';
    
    @Component({
        components: {
            "player": Player
        }
    })
    export default class Players extends Vue {
        async mounted() {
            await this.$store.dispatch('fetchPlayers');
        }
    }
</script>
<style scoped>
    .selected {
        background-color: lightblue
    }
</style>