<template>
    <v-card class="number-card">
        <v-card-title>{{title}}</v-card-title>
        <v-card-text :class="valueTypography()">{{stringValue}}</v-card-text>
        <v-card-subtitle>
            <v-row dense>
                <v-col class="col-auto mr-auto">{{subtitle}}</v-col>
                <v-col class="col-auto">{{secondSubtitle}}</v-col>
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
        value: [Number, String],
        subtitle: [Number, String],
        secondSubtitle: [Number, String],
        dense: Boolean,
    },
})
export default class NumberStat extends Vue {
    value!: string | number;
    dense!: boolean;
    get stringValue() {
        if (typeof this.value === "string") return this.value;
        return this.value.toString();
    }
    valueTypography() {
        return {
            "text-center": true,
            "py-auto": true,
            small: this.dense,
            large: !this.dense,
            "display-2": this.stringValue.length < 4,
            "display-1":
                this.stringValue.length >= 4 && this.stringValue.length < 9,
            headline:
                this.stringValue.length >= 9 && this.stringValue.length < 11,
            title: this.stringValue.length >= 11,
        };
    }
}
</script>
<style>
.number-card .large {
    min-height: 60px !important;
}
.number-card .small {
    min-height: 40px !important;
}
</style>
