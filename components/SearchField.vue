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
            country: "JP",
            cities: ["Tokyo", "Yokohama", "Kyoto", "Osaka", "Sapporo", "Nagoya"]
        }
    },
    watch: {
        async selected (value) {
            // const city = await this.$store.dispatch('getCityInformation', { city: value, country: 'JP' })
            this.$store.dispatch('getLocationWeather', { city: value, country: this.country })
        }
    },
    async created () {
        const res = await this.$store.dispatch('getLocationWeather', { city: this.selected, country: this.country })
    }
}
</script>