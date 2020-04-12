import Vue from 'vue'

Vue.filter('formatDateTime', (value, format) => {
    let __format = format ? format : 'DD MMM YYYY'

    if (value) {
        return Vue.moment(value).format(__format)
    }
})

Vue.filter('convertKelvinToCelsius', (kelvin) => {
    return parseInt(kelvin - 273.15);
})

Vue.filter('convertKelvinToFarenheight', (kelvin) => {
    return parseInt((kelvin - 273.15) * 1.8 + 32);
})

