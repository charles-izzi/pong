<template>
    <div>
        <v-text-field
            type="number"
            min="1"
            max="20"
            label="Count"
            :value="value"
            @input="input"
            :prepend-icon="'mdi-minus'"
            @click:prepend="decrement"
            :append-outer-icon="'mdi-plus'"
            @click:append-outer="increment"
            :class="increment"
        ></v-text-field>
    </div>
</template>

<script>
    export default {
        name: "NumberInput",
        props: {
            value: Number,
        },

        data() {
            return {};
        },

        methods: {
            decrement() {
                if (this.value <= 1) return;
                this.$emit("input", this.value - 1);
            },
            increment() {
                if (this.value >= 20) return;
                this.$emit("input", this.value + 1);
            },
            input(e) {
                if (isNaN(e)) {
                    this.$emit("input", 1);
                    return;
                }
                const val = Number(e);
                if (val < 1) {
                    this.$emit("input", 1);
                    return;
                }
                if (val > 20) {
                    this.$emit("input", 20);
                    return;
                }
                this.$emit("input", val);
            },
        },
    };
</script>
<style>
    .v-text-field input {
        text-align: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
