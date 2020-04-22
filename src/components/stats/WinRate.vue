<template>
    <v-card class="justify-center win-rate">
        <v-card-title>Win Rate</v-card-title>
        <v-card-text class="text-center">
            <v-progress-circular
                rotate="270"
                size="64"
                :value="winRate"
                width="12"
                color="green"
            >{{winRate}}%</v-progress-circular>
        </v-card-text>
        <v-row dense align="center" justify="end">
            <v-spacer></v-spacer>
            <v-col cols="1" class="text-right legend-color">
                <div class="red square"></div>
            </v-col>
            <v-col cols="3" class="legend-text">{{loseCount}}</v-col>
            <v-col cols="1" class="text-right legend-color">
                <div class="green square"></div>
            </v-col>
            <v-col cols="3" class="legend-text">{{winCount}}</v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
    props: {
        winRate: Number,
        winCount: Number,
        loseCount: Number,
    },
})
export default class WinRate extends Vue {}
</script>
<style>
.win-rate .v-progress-circular__underlay {
    stroke: #f44336;
}
.win-rate .square {
    height: 10px;
    width: 10px;
}
.win-rate div.legend-text {
    margin-left: 8px;
    padding: 0 !important;
}
.win-rate div.legend-color {
    padding-left: 6px !important;
}
</style>
