<template>
    <v-row>
        <v-col cols="12" v-for="val in players" :key="val" style="padding: 0px 0px;" :ref="val">
            <player
                :id="val"
                :name="$repo.state.players.players.hash[val].player"
                :elo="$repo.state.players.players.hash[val].elo"
                :rank="$repo.state.players.players.hash[val].rank"
                :getSelected="getSelected"
                :setSelected="setSelected"
                :selectColor="selectColor"
            ></player>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Player from "./Player.vue";

@Component({
    props: {
        players: Array,
        selectColor: String,
        setSelected: Function,
        getSelected: Function,
    },
    components: {
        player: Player,
    },
})
export default class Players extends Vue {}
</script>
