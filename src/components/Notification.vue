<template>
    <v-snackbar
      v-model="show"
      :color="color"
      :multi-line="true"
      :timeout="6000"
      :top="true"
    >
    {{ text }}
      <v-btn
        dark
        text
        @click="show = false">
        Close
      </v-btn>
    </v-snackbar>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component<Notification>({
    props: {
        value: Boolean,
        text: String,
        color: String
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.$emit('input', val);
        }
    }
})
export default class Notification extends Vue {
    value!: boolean;
    show: boolean = this.value;
}
</script>