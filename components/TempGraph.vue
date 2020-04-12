<template>
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

</template>

<script>
export default {
    computed: {
        type () {
            return this.$store.state.celius
        },
        graphValues () {
            const list = []
            if (this.$store.state.hourlyWeather) {
                this.$store.state.hourlyWeather.map(item => {
                    const hour = this.$moment(item.dt_txt).hours()
                    console.log(hour)
                    if (hour % 3 === 0) {
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
                    if (hour % 3 === 0) {
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