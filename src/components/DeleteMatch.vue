<template>
    <v-dialog v-model="$store.state.showDeleteMatchDialog" max-width="350">
        <v-card>
            <v-card-title class="headline">Delete Match?</v-card-title>
            
            
            <v-card-text class="text-center">
                This will delete the match and undo the players' rating change.
                <br />
                <br />
                <match-history-table :isDeleteDialog="true"></match-history-table>
                <!-- {{player1}}
                <span v-if="isWin">(winner)</span>
                vs {{player2}}
                <span v-if="!isWin">(winner)</span> -->
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="gray darken-1"
                    text
                    @click="$store.dispatch('setShowDeleteMatchDialog', false)"
                >Cancel</v-btn>

                <v-btn color="red darken-1" text @click="deleteMatch()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MatchHistoryTable from "./MatchHistoryTable.vue";
@Component({
    components: {
        'match-history-table': MatchHistoryTable,
    }
})
export default class DeleteMatch extends Vue {
    get match() {
        if (!this.$store.state.deleteMatchKey) return "";
        return this.$store.getters.match(this.$store.state.deleteMatchKey);
    }
    get player1() {
        return this.match ? this.match.player1Name : "";
    }
    get player2() {
        return this.match ? this.match.player2Name : "";
    }
    get isWin() {
        return this.match ? this.match.player1Wins : false;
    }
    deleteMatch() {
        this.$store.dispatch("removeMatch", this.$store.state.deleteMatchKey);
        this.$store.dispatch("setShowDeleteMatchDialog", false);
    }
}
</script>