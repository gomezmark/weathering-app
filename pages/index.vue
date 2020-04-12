<template>
  <div class="w-main-bg">
    <page-container>
      <div class="py-5">
        <v-layout row wrap>
          <v-flex md3>
            <!-- search input -->
            <search-field/>
          </v-flex>
        </v-layout>
          <div 
            v-if="$store.state.locationWeather"
            class="w-container">
            <switch-temp></switch-temp>
            <div class="pa-3 text-sm-center">
              <div class="mb-5">
                <p class="display-3 mb-0">{{ $store.state.locationWeather.name }}</p>
                <p class="mb-0">{{ date | formatDateTime('dddd DD MMM, YYYY') }}</p>
                <p>{{ time | formatDateTime('hh:mm A') }}</p>
              </div>
              <div>
                <v-layout row wrap justify-center>
                  <div class="w-min-temp">
                    <p 
                      class="mb-0">{{ $store.state.locationWeather.main.temp | convertTemp($store.state.celsius) }}</p>
                    <v-img
                      :src="`http://openweathermap.org/img/wn/${$store.state.locationWeather.weather[0].icon}@2x.png`"
                      height="80"
                    ></v-img>
                  </div>
                  <div 
                    class="w-main-temp mx-2">
                    <p class="display-1 mb-0">{{ $store.state.locationWeather.main.temp | convertTemp($store.state.celsius) }}</p>
                      <v-img
                        :src="`http://openweathermap.org/img/wn/${$store.state.locationWeather.weather[0].icon}@2x.png`"
                        height="120"
                        width="120"
                        cover
                        class="mb-5"
                      ></v-img>
                    <p class="title bold white--text capitalize">{{ $store.state.locationWeather.weather[0].description }}</p>
                  </div>
                  <div class="w-max-temp">
                    <p class="mb-0">{{ $store.state.locationWeather.main.temp | convertTemp($store.state.celsius) }}</p>
                    <v-img
                        :src="`http://openweathermap.org/img/wn/${$store.state.locationWeather.weather[0].icon}@2x.png`"
                        height="80"
                      ></v-img>
                  </div>
                </v-layout>
              </div>
              <v-layout row wrap justify-center my-5>
                <v-flex md3>
                  Feels like: {{ $store.state.locationWeather.main.feels_like | convertTemp($store.state.celsius) }}
                </v-flex>
                <v-flex md3>
                  Humidity: {{ $store.state.locationWeather.main.feels_like }}
                </v-flex>
                <v-flex md3>
                  Wind: {{ $store.state.locationWeather.main.feels_like }}
                </v-flex>
              </v-layout>
            </div>

            <div style="height:4px;">
              <v-progress-linear
                v-show="$store.state.loading"
                color="white"
                :indeterminate="true"></v-progress-linear>
            </div>
            <div class="sub-details grey--text">
              <v-layout row wrap>
                <v-flex 
                  md3 sm3
                  class="text-center">
                  <div class="mb-3">
                    <img
                      src="/sunrise.png"
                      alt="sunrise"
                      height="60"
                    >
                    <p class="mb-0 bold">Sunrise</p>
                    <span>{{ $store.state.locationWeather.sys.sunrise | formatDateTime('hh:mm A') }}</span>
                  </div>  
                  <div>
                    <img
                      src="/sunset.png"
                      alt="sunrise"
                      height="60"
                    >
                    <p class="mb-0 bold">Sunset</p>
                    <span>{{ $store.state.locationWeather.sys.sunset | formatDateTime('hh:mm A') }}</span>
                  </div>
                </v-flex>
                <v-flex
                  md9 sm9
                  class="text-center">
                  <hourly></hourly>
                </v-flex>
                <v-flex xs12 md12>
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
import Hourly from "~/components/Hourly.vue"
import SwitchTemp from "~/components/SwitchTemp.vue"
import TempGraph from "~/components/TempGraph.vue"

export default {
  data () {
    return {
      date: new Date(),
      time: new Date()
    }
  },
  components: {
    PageContainer,
    SearchField,
    Hourly,
    SwitchTemp,
    TempGraph
  },
  computed: {
    locationWeather () {
      return this.$store.getters("GET_CURRENT_LOCATION")
    }
  },
  methods: {
    test () {
      return 'test'
    },
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
      navigator.geolocation.getCurrentPosition(this.showPosition)
    }
  }
}
</script>