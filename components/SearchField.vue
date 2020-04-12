<template>
    <div>
        <v-autocomplete
            v-model="selected"
            :items="cities"
            color="white"
            class="white--text"
            placeholder="Look for your City"
            dark
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
            const city = await this.$store.dispatch('getCityInformation', { city: value, country: 'JP' })
            console.log(city)
            if (city.status) {
                this.$store.dispatch('getLocationWeather', 
                    { 
                        type: 1,
                        city: city.data.response.geocode.feature.name, 
                        country: city.data.response.geocode.feature.cc
                    })
            } else {

            }
        }
    },
    methods: {
        showPosition (position) {
            if (position) {
                this.$store.dispatch('getLocationWeather', {
                    type: 2,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            } else {
                this.$store.dispatch('getLocationWeather', { 
                    type: 1,
                    city: this.selected, 
                    country: this.country 
                })
            }
        }
    },
    mounted () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }
    },
    async created () {
        // const res = await this.$store.dispatch('getLocationWeather', { city: this.selected, country: this.country })
    }
}
</script>