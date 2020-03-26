<template>
    <div>
        <v-dialog v-model="show" max-width="350">
            <v-card>
                <v-card-title class="headline"
                    >Continue Existing Session?</v-card-title
                >
                <v-card-text class="text-left subtitle-1">
                    Use player selection to start a new match-making session or
                    continue the existing one?
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on" class="ml-2 mb-2"
                                >mdi-help-circle-outline</v-icon
                            >
                        </template>
                        <v-card-text class="text-left"
                            >Select 'Continue Existing' if you're using the
                            player selection to change the player pool in the
                            existing match-making session</v-card-text
                        >
                        <v-card-text class="text-left"
                            >Select 'Start New' to forget the existing
                            match-making session and use the player selection to
                            start a new one</v-card-text
                        >
                    </v-tooltip>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="showConfirmation = true"
                        >Start New</v-btn
                    >

                    <v-btn color="blue darken-1" text @click="goToMatchMaker()"
                        >Continue Existing</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showConfirmation" max-width="350">
            <v-card>
                <v-card-title class="headline">Reset Session?</v-card-title>
                <v-card-text class="text-center"
                    >Confirm resetting the match-making session</v-card-text
                >

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="grey darken-1"
                        text
                        @click="showConfirmation = false"
                        >Cancel</v-btn
                    >

                    <v-btn
                        color="green darken-1"
                        text
                        @click="startNewConfirmed()"
                        >Confirm</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { matchMakerRoute } from "@/router";
import Component from "vue-class-component";
import { MatchMaker } from "@/business/matchMaking/matchMaker";

@Component({
    props: {
        show: Boolean,
    },
    watch: {
        show: function(val) {
            if (
                val &&
                (!this.$repo.state.matchMaker.matchMaker.playerPool ||
                    !Object.keys(
                        this.$repo.state.matchMaker.matchMaker.playerPool
                    ).length)
            )
                this.$router.push(matchMakerRoute);
        },
    },
})
export default class MatchMakerMenu extends Vue {
    show!: boolean;
    showConfirmation = false;

    goToMatchMaker() {
        this.$router.push(matchMakerRoute);
    }

    startNewConfirmed() {
        this.$repo.commit.matchMaker.setMatchMaker({} as MatchMaker);
        this.$repo.commit.matchMaker.setActiveMatches([]);
        this.goToMatchMaker();
        this.showConfirmation = false;
        this.$emit("menu-complete");
    }
}
</script>
