<template>
  <div>
    <v-layout row wrap mb-4>
      <v-flex xs12 text-sm-left>
        <v-slide-group
          v-model="date"
          :max="1"
          show-arrows
          style="height:50px">
          <v-slide-item
            v-for="date in $store.state.dates"
            :key="date"
            :value="date"
            v-slot:default="{ active, toggle }">
            <span 
              :class="active ? 'active' : ''" 
              class="w-date"
              @click="toggle">
              {{ $moment(date).isSame($moment(), 'day') ? 'Today' : $moment(date).format('dddd') }}
            </span>
          </v-slide-item>
        </v-slide-group>
      </v-flex>
    </v-layout>
    <v-slide-group
        show-arrows>
        <v-slide-item 
            v-for="item in weather"
            :key="item.dt_text">
            <div class="text-sm-center" style="width:20%">
                <p 
                    v-if="$moment(item.dt_txt).isSame($moment(), 'hour')"
                    class="white--text bold mb-0">Now</p>
                <p v-else
                  class="mb-0">{{ item.dt_txt | formatDateTime('hh a') }}</p>
                <p class="w-description">{{ item.weather[0].main }}</p>
                <v-img
                    :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
                    height="70"
                    width="70"
                    style="margin:auto"
                ></v-img>
                <p>{{ item.main.temp | convertKelvinToFarenheight }}° F</p>
            </div>
        </v-slide-item>
    </v-slide-group>
    <div>
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="transparent"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline
          :value="graphValues"
          :gradient="['rgba(255, 255, 255, 0.2)']"
          fill
          :smooth="20"
          color="white"
          line-width="1"
          padding="16"
        ></v-sparkline>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: this.$moment().format("YYYY-MM-DD"),
    }
  },
  computed: {
        type () {
            return this.$store.state.celius
        },
        weather () {
          let list = []
          return this.$store.state.hourlyWeather.filter(data => {
            const date = this.$moment(data.dt_txt).format("YYYY-MM-DD")
            if (date === this.date) {
              return data
            }
          })
        },
        graphValues () {
            const list = []
            if (this.$store.state.hourlyWeather) {
                this.$store.state.hourlyWeather.map(item => {
                    const hour = this.$moment(item.dt_txt).hours()
                    const date = this.$moment(item.dt_txt).format("YYYY-MM-DD")
                    if (hour % 3 === 0 && date === this.date) {
                        const val = this.type ?
                            this.$options.filters.convertKelvinToCelsius(item.main.temp)
                            : this.$options.filters.convertKelvinToFarenheight(item.main.temp)
                        
                        list.push(val)
                    }
                })
            }
            return list
        },
        labels () {
            const list = []
            if (this.$store.state.hourlyWeather) {
                this.$store.state.hourlyWeather.filter(item => {
                    const hour = this.$moment(item.dt_txt).hours()
                    const date = this.$moment(item.dt_txt).format("YYYY-MM-DD")
                    if (hour % 3 === 0 && date === this.date) {
                        list.push(this.$moment(item.dt_txt).format('h a'))
                    }
                })
            }
            console.log(list)
            return list
        }
    }
}
</script>