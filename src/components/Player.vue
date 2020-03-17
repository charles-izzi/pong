<template>
  <v-card @click="setSelected(id)" :color="color">
    <v-card-text>
      <v-row class="mx-4">
        <h2 :class="{ 'rank-col': !dense, 'rank-col-dense': dense }">
          {{ rank }}
        </h2>
        <h3 class="font-weight-regular" style="padding-left: 10px;">
          {{ name }}
        </h3>
        <v-spacer></v-spacer>
        <h3 class="font-weight-regular">{{ elo }}</h3>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IPlayer, unselectedColor } from "@/business/playModel";

@Component<Player>({
  props: {
    id: String,
    name: String,
    elo: Number,
    rank: Number,
    dense: Boolean,
    getSelected: Function,
    setSelected: Function,
    selectColor: String
  }
})
export default class Player extends Vue {
  id!: string;
  name!: string;
  elo!: number;
  playing!: boolean;
  selectColor!: string;
  getSelected!: (id: string) => boolean;
  setSelected!: (id: string) => void;
  get color() {
    if (this.getSelected && this.getSelected(this.id)) return this.selectColor;
    return unselectedColor;
  }
}
</script>
<style>
.v-card {
  border-radius: 0 !important;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.1),
    0px 2px 2px 0px rgba(0, 0, 0, 0.07), 0px 1px 5px 0px rgba(0, 0, 0, 0.06);
}
.v-card__text {
  padding: 10px 16px;
}
p {
  margin-bottom: 0 !important;
}
.rank-col {
  width: 8%;
}
.rank-col-dense {
  width: 6%;
}
</style>
