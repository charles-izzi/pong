<template>
    <v-dialog v-model="$repo.state.showAddDialog" persistent max-width="600px">
        <template></template>
        <v-card>
            <v-card-title>
                <span class="headline">Add Player</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="addForm" v-model="valid">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="name"
                                    label="Name"
                                    required
                                    :rules="nameRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" text @click="close()">Close</v-btn>
                <v-btn class="ps-3" color="primary darken-1" text @click="saveAndClose()">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AddPlayer extends Vue {
    valid = true;
    nameRules = [
        (v: string) => {
            return !!v || "Name is required";
        },
        (v: string) => {
            return (
                !v ||
                v.length < 1 ||
                v.length > 1 ||
                "Name needs at least 2 characters"
            );
        },
        (v: string) => {
            return (
                !v ||
                !this.$repo.getters.players.playerByName(v) ||
                "Name already exists"
            );
        },
    ];
    name = "";
    close() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$refs.addForm as any).reset();
        this.$repo.commit.setShowAddDialog(false);
    }
    async saveAndClose() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((this.$refs.addForm as any).validate()) {
            this.$repo.commit.setShowAddDialog(false);
            await this.$repo.dispatch.players.addPlayer(this.name);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this.$refs.addForm as any).reset();
        }
    }
}
</script>
<style scoped>
button.v-card__actions {
    padding: 0 16px;
}
</style>
