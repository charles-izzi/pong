<template>
    <v-card>
        <v-card-title>Rating Vs Time</v-card-title>
        <line-chart :chartdata="chartdata"></line-chart>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LineChart from "../LineChart.vue";
@Component({
    props: {
        chartdata: {
            type: Object,
            default: null,
        },
    },
    components: {
        "line-chart": LineChart,
    },
})
export default class RatingVsTime extends Vue {}
</script>