<template>
  <v-card>
    <v-card-title>
      <span class="headline">Match Histroy</span>
    </v-card-title>
    <v-card-text>
        Coming Soon
    </v-card-text>
    <v-fab-transition>
      <v-btn
        @click="$router.push('/')"
        class="lighten-3"
        fab
        bottom
        right
        color="grey"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
@Component({})
export default class MatchHistory extends Vue {
    
}
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