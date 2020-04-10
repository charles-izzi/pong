<template>
    <v-dialog v-model="$repo.state.matchHistory.deleteDialog.show" max-width="350">
        <v-card>
            <v-card-title class="headline">Delete Match?</v-card-title>

            <v-card-text class="text-center">
                This will delete the match and undo the players' rating change.
                <br />
                <br />
                <match-history :isDeleteDialog="true"></match-history>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="gray darken-1"
                    text
                    @click="$repo.commit.matchHistory.closeDeleteDialog()"
                >Cancel</v-btn>

                <v-btn color="red darken-1" text @click="deleteMatch()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MatchHistory from "./MatchHistory.vue";
@Component({
    components: {
        "match-history": MatchHistory,
    },
})
export default class DeleteDialog extends Vue {
    get player1() {
        return this.$repo.state.matchHistory.deleteDialog.match ? 
            this.$repo.getters.matchHistory.matchPlayer1(this.$repo.state.matchHistory.deleteDialog.match.id).player : "";
    }
    get player2() {
        return this.$repo.state.matchHistory.deleteDialog.match ? 
            this.$repo.getters.matchHistory.matchPlayer2(this.$repo.state.matchHistory.deleteDialog.match.id).player : "";
    }
    get isWin() {
        return this.$repo.state.matchHistory.deleteDialog.match ? this.$repo.state.matchHistory.deleteDialog.match.player1Wins : false;
    }
    deleteMatch() {
        this.$repo.dispatch.matchHistory.removeMatch(this.$repo.state.matchHistory.deleteDialog.match.id);
        this.$repo.commit.matchHistory.closeDeleteDialog();
    }
}
</script>
