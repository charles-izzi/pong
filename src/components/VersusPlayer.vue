<template>
    <div v-if="alignRight">
        <v-row>
            <v-col cols="auto" align="left" class="dense-col" style="padding-right:0;">
                <div
                    class="subtitle-1 card-text-sized grey--text text--darken-3"
                >{{ player.player }}</div>
                <v-card-subtitle class="card-subtitle-sized">
                    {{
                    player.elo
                    }}
                </v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align="right" class="dense-col" style="padding-left:0;">
                <div class="headline grey--text text--darken-1 my-2 mx-2">{{ player.rank }}</div>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        <v-row>
            <v-col align="left" class="dense-col" style="padding-right:0;">
                <div class="headline grey--text text--darken-1 my-2 mx-2">{{ player.rank }}</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" align="right" class="dense-col" style="padding-left:0;">
                <div
                    class="subtitle-1 card-text-sized grey--text text--darken-3"
                >{{ player.player }}</div>
                <v-card-subtitle class="card-subtitle-sized">
                    {{
                    player.elo
                    }}
                </v-card-subtitle>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
    props: {
        playerId: String,
        alignRight: Boolean,
    },
})
export default class VersusPlayer extends Vue {
    playerId!: string;

    get player() {
        return this.$repo.state.players.players.hash[this.playerId];
    }
}
</script>
<style scoped>
.card-text-sized {
    padding: 2px 10px 0px;
}
.card-subtitle-sized {
    padding: 0px 10px 2px;
}
.dense-col {
    padding-top: 0;
    padding-bottom: 0;
}
.overflow {
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
