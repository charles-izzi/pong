<template>
    <v-card class="justify-center">
        <v-card-title>{{strong ? "Strong" : "Weak"}} Against</v-card-title>
        <v-simple-table dense>
            <thead>
                <tr>
                    <th></th>
                    <th>Opponent</th>
                    <th>Expected</th>
                    <th>Actual</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(playerFare, i) in playerFares" :key="playerFare.name">
                    <td>{{i + 1}}</td>
                    <td>{{$repo.state.players.players.getName(playerFare.opponentId)}}</td>
                    <td>{{playerFare.expected}}%</td>
                    <td>{{playerFare.actual}}%</td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
    props: {
        strong: Boolean,
        playerFares: Array,
    },
})
export default class WinRate extends Vue {}
</script>
