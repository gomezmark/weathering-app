<template>
  <div class="w-main-bg">
    <page-container>
      <div class="py-5">
        <v-layout row wrap>
          <v-flex md3>
            <!-- search input -->
            <search-field/>
            {{ $store.state.locationWeather }}
          </v-flex>
        </v-layout>
          <div class="w-container">
            <div class="pa-3 text-sm-center">
              <div class="mb-5">
                <p class="display-3 mb-0">{{ current.name }}</p>
                <p class="mb-0">{{ date | formatDateTime('dddd DD MMM, YYYY') }}</p>
                <p>{{ time | formatDateTime('hh:mm A') }}</p>
              </div>
              <div>
                <v-layout row wrap justify-center>
                  <div class="w-min-temp">
                    <p class="mb-0">{{ current.main.temp | convertKelvinToFarenheight }}° F</p>
                    <img
                      :src="`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`"
                    >
                  </div>
                  <div class="mx-2">
                    <p class="display-1">{{ current.main.temp | convertKelvinToFarenheight }}° F</p>
                      <img
                        src="/v.png"
                        alt="Vuetify.js"
                        class="mb-5"
                      >
                    <p>{{ current.weather[0].main }}</p>
                  </div>
                  <div class="w-max-temp">
                    <p class="mb-0">{{ current.main.temp | convertKelvinToFarenheight }}° F</p>
                    <img
                        src="/v.png"
                        alt="Vuetify.js"
                      >
                  </div>
                </v-layout>
              </div>
              <v-layout row wrap justify-center my-5>
                <v-flex md3>
                  Feels like: {{ current.main.feels_like }}
                </v-flex>
                <v-flex md3>
                  Humidity: {{ current.main.feels_like }}
                </v-flex>
                <v-flex md3>
                  Wind: {{ current.main.feels_like }}
                </v-flex>
              </v-layout>
            </div>

            <div class="sub-details grey--text">
              <v-layout row wrap>
                <v-flex 
                  class="text-center">
                  <img
                    src="/sunrise.png"
                    alt="sunrise"
                    height="100"
                    class="mb-5"
                  >
                  <p class="mb-0">Sunrise</p>
                  <span>{{ current.sys.sunrise | formatDateTime('hh:mm A') }}</span>
                </v-flex>
                <v-flex 
                  class="text-center">
                  <img
                    src="/sunset.png"
                    alt="sunrise"
                    height="100"
                    class="mb-5"
                  >
                  <p class="mb-0">Sunset</p>
                  <span>{{ current.sys.sunset | formatDateTime('hh:mm A') }}</span>
                </v-flex>
              </v-layout>
            </div>
          </div>
      </div>
    </page-container>
  </div>

</template>

<script>

import PageContainer from "~/components/PageContainer.vue"
import SearchField from "~/components/SearchField.vue"

export default {
  data () {
    return {
      date: new Date(),
      time: new Date(),
      current: {
          "coord": { 
            "lon": 139,
            "lat": 35
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01n"
            }
          ],
          "base": "stations",
          "main": {
            "temp": 281.52,
            "feels_like": 278.99,
            "temp_min": 280.15,
            "temp_max": 283.71,
            "pressure": 1016,
            "humidity": 93
          },
          "wind": {
            "speed": 0.47,
            "deg": 107.538
          },
          "clouds": {
            "all": 2
          },
          "dt": 1560350192,
          "sys": {
            "type": 3,
            "id": 2019346,
            "message": 0.0065,
            "country": "JP",
            "sunrise": 1560281377,
            "sunset": 1560333478
          },
          "timezone": 32400,
          "id": 1851632,
          "name": "Shuzenji",
          "cod": 200
        }
      }
  },
  components: {
    PageContainer,
    SearchField
  },
  computed: {
    locationWeather () {
      return this.$store.getters('GET_CURRENT_LOCATION')
    }
  },
  methods: {
    showPosition (position) {
      console.log(position)
    }
  },
  mounted () {
    let vm = this
    setInterval(() => {
      vm.time = new Date().getTime()
    }, 1000)

    if (navigator.geolocation) {
      console.log('here')
      navigator.geolocation.getCurrentPosition(this.showPosition)
    }
  }
}
</script>