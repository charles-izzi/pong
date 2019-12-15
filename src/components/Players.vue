<template>
    <v-row>
        <v-col 
        cols="6"
        v-for="(val, k) in $store.state.players"
        :key="k">
            <player :id="k" :name="val.player" :elo="val.elo" :playing="false"></player>
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