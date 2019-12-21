<template>
    <v-card @click="selectPlayer" :color="color" max>
        <v-card-text>
            <v-row class="mx-2">
                <h2>{{rank}}</h2>
                &nbsp;&nbsp;
                <h2 class="font-weight-regular" style="padding-left: 10px;">{{name}}</h2>
                <v-spacer></v-spacer>
                <h3 class="font-weight-regular">{{elo}}</h3>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IPlayer, unselectedColor, selectedColor, winnerColor } from '@/business/playModel';
    
@Component<Player>({
    props: {
        id: String,
        name: String,
        elo: Number,
        rank: Number,
        playing: Boolean
    }
})
export default class Player extends Vue {
    id!: string;
    name!: string;
    elo!: number;
    playing!: boolean;
    selectPlayer() {
        if (this.playing) {
            this.$store.dispatch('setWinner', this.id);
            return;
        }
        this.$store.dispatch('selectPlayer', this.id);
    }
    get color() {
        if (!this.playing && this.$store.getters.isPlayerSelected(this.id)) return selectedColor;
        if (this.playing && this.$store.getters.isPlayerWinner(this.id)) return winnerColor;
        return unselectedColor;
    }
}
</script>
<style>
    .v-card__text {
        padding: 10px 16px;
    }
    p  {
        margin-bottom: 0 !important;
    }
</style>