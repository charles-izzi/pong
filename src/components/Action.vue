<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-show="$store.getters.noPlayersSelected"
        @click="$store.dispatch('setShowAddDialog', true)"
        dark
        fab
        bottom
        right
        color="blue"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="$store.getters.onePlayerSelected"
        @click="$router.push('/MatchHistory')"
        class="lighten-1"
        fab
        bottom
        right
        color="grey"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="$store.getters.twoPlayersSelected"
        @click="$store.dispatch('setShowPlayDialog', true)"
        dark
        fab
        bottom
        right
        color="green"
      >
        <v-icon>mdi-table-tennis</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Action extends Vue {}
</script>
<style scoped>
button.v-btn--fab {
  position: fixed;
  bottom: 5% !important;
  right: 7% !important;
  height: 75px !important;
  width: 75px !important;
}
.v-btn--fab .v-icon {
  height: 38px;
  font-size: 38px;
  width: 38px;
}
</style>