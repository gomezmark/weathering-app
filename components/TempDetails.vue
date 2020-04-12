<template>
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
            class="mb-0"
          >{{ $store.state.locationWeather.main.temp | convertTemp($store.state.celsius) }}</p>
          <v-img
            :src="`http://openweathermap.org/img/wn/${$store.state.locationWeather.weather[0].icon}@2x.png`"
            height="80"
          ></v-img>
        </div>
        <div class="w-main-temp mx-2">
          <p
            class="display-1 mb-0"
          >{{ $store.state.locationWeather.main.temp | convertTemp($store.state.celsius) }}</p>
          <v-img
            :src="`http://openweathermap.org/img/wn/${$store.state.locationWeather.weather[0].icon}@2x.png`"
            height="120"
            width="120"
            cover
            class="mb-5"
          ></v-img>
          
        </div>
        <div class="w-max-temp">
          <p
            class="mb-0"
          >{{ $store.state.locationWeather.main.temp | convertTemp($store.state.celsius) }}</p>
          <v-img
            :src="`http://openweathermap.org/img/wn/${$store.state.locationWeather.weather[0].icon}@2x.png`"
            height="80"
          ></v-img>
        </div>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <p
            class="title bold white--text capitalize"
          >{{ $store.state.locationWeather.weather[0].description }}</p>
        </v-flex>
      </v-layout>
    </div>
    <v-layout row wrap justify-center my-5>
      <v-flex
        md3
      >Feels like: {{ $store.state.locationWeather.main.feels_like | convertTemp($store.state.celsius) }}</v-flex>
      <v-flex md3>Humidity: {{ $store.state.locationWeather.main.feels_like }}</v-flex>
      <v-flex md3>Wind: {{ $store.state.locationWeather.main.feels_like }}</v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      time: new Date()
    };
  },
  mounted () {
    let vm = this
    setInterval(() => {
      vm.time = new Date().getTime()
    }, 1000)
  }
};
</script>