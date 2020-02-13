<template>
    <v-row>
        <v-col
            cols="12"
            v-for="val in players"
            :key="val"
            style="padding: 0px 0px;"
            :ref="val"
        >
            <player
                :id="val"
                :name="$store.getters.player(val).player"
                :elo="$store.getters.player(val).elo"
                :rank="$store.getters.player(val).rank"                
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
import { IPlayers } from "../business/playModel";
import Player from "./Player.vue";

@Component({
    props: {
        players: Array,
        selectColor: String,
        setSelected: Function,
        getSelected: Function
    },
    components: {
        player: Player
    }
})
export default class Players extends Vue {
}
</script>