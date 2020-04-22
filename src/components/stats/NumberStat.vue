<template>
    <v-card class="number-card">
        <v-card-title>{{title}}</v-card-title>
        <v-card-text
            :class="{'text-center': true, 'display-2': !dense, 'display-1': dense, 'text-padding': !dense}"
        >{{value}}</v-card-text>
        <v-card-subtitle>
            <v-row dense>
                <v-col>{{subtitle}}</v-col>
                <v-spacer></v-spacer>
                <v-col>{{secondSubtitle}}</v-col>
            </v-row>
        </v-card-subtitle>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
    props: {
        title: String,
        value: Number,
        subtitle: String,
        secondSubtitle: String,
        dense: Boolean,
    },
})
export default class NumberStat extends Vue {}
</script>
<style>
.number-card .text-padding {
    padding: 5px 0 !important;
}
</style>
