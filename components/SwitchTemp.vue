
<template>
    <v-layout 
        row wrap align-center
        style="position:absolute; right: 10px;">
        <span>° F</span>
        <v-switch 
            v-model="value"
            color="white"
            @click.prevent.stop="changeTemp(value)"
            class="mx-2"
        ></v-switch>
        <span>° C</span>
    </v-layout>
</template>

<script>
export default {
    computed: {
        value () {
            return this.$store.state.celsius
        }
    },
    methods: {
        changeTemp (value) {
            this.$store.commit('SET_CELSIUS', !value)
        }
    }

}
</script>