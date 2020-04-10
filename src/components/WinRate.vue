<template>
    <v-card class="justify-center">
        <v-card-title>Win Rate</v-card-title>
        <v-card-text class="text-center">
            <v-progress-circular
                rotate="270"
                size="86"
                :value="winRate"
                width="14"
                color="green"
            >{{winRate}}%</v-progress-circular>
        </v-card-text>
        <v-row dense align="center" justify="end">
            <v-spacer></v-spacer>
            <v-col cols="1" class="text-right">
                <div class="red square"></div>
            </v-col>
            <v-col cols="3" style="padding-left: 8px;">{{loseCount}}</v-col>
            <v-col cols="1" class="text-right">
                <div class="green square"></div>
            </v-col>
            <v-col cols="3" style="padding-left: 8px;">{{winCount}}</v-col>
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
.v-progress-circular__underlay {
    stroke: #f44336;
}
.square {
    height: 12px;
    width: 12px;
}
</style>
