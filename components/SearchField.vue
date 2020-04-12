<template>
    <div>
        <v-autocomplete
            v-model="selected"
            :items="cities"
            color="white"
            class="white--text"
            placeholder="Look for your City"
            >
        </v-autocomplete>
    </div>
</template>


<script>
export default {
    data () {
        return {
            selected: "Tokyo",
            cities: ["Tokyo", "Yokohama", "Kyoto", "Osaka", "Sapporo", "Nagoya"]
        }
    },
    watch: {
        selected (value) {
            console.log(value)
            this.$store.dispatch('getCityInformation', { city: value, country: 'JP' })
        }
    }
}
</script>