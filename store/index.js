import Vuex from 'vuex'
import Vue from 'vue'

const querystring = require('query-string')


const state = () => ({
    loading: false,
    currentCity: 'Tokyo',
    currentCountry: 'JP',
    locationWeather: null,
    hourlyWeather: null,
    dates: [],
    celsius: false
})

const createStore = () => {
  return new Vuex.Store({
    state: state,
    mutations: {
        SET_LOADING (state, payload) {
            state.loading = payload
        },
        SET_LOCATION_WEATHER (state, payload) {
            state.locationWeather = { ...payload }
        },
        SET_HOURLY_WEATHER (state, payload) {
            state.hourlyWeather = [ ...payload ]
        },
        SET_CELSIUS (state, payload) {
            state.celsius = payload
        },
        SET_DATES (state, payload) {
            state.dates = [ ...payload ]
        }
    },
    getters: {
        GET_LOCATION_WEATHER (state) {
            state.locationWeather
        }
    },
    actions: {
        // async nuxtServerInit ({ dispatch }) {
        //     console.log('server init')
        //     await dispatch('getLocationWeather', { city: state.currentCity, country: state.currentCountry } )
        // },
        async getLocationWeather ({ commit }, payload ) {
            commit('SET_LOADING', true)
            const query = {
                q: `${payload.city},${payload.country}`,
                appid: process.env.WEATHER_API_KEY
            };
            let location = {}, hourly = {}

            if (process.env.DATA === 'local') {
                location = {
                    status: 200,
                    data: require("~/data/weather.json")
                }
                hourly = {
                    status: 200,
                    data: require("~/data/forecast.json")
                }
            } else {
                [location, hourly] = await Promise.all([
                    this.$axios.get(`/weather/weather?${querystring.stringify(query)}`), 
                    this.$axios.get(`/weather/forecast?${querystring.stringify(query)}`)
                ])
            }

            commit('SET_LOADING', false)
            
            
            if (location.status && location.status === 200) {
                commit('SET_LOCATION_WEATHER', location.data)
            }
            if (hourly.status && hourly.status === 200) {
                let dates = []
                hourly.data.list.map(item => {
                    const date = Vue.moment(item.dt_txt).format("YYYY-MM-DD")
                    if (!dates.includes(date)) {
                        dates.push(date)
                    }
                })
                commit('SET_HOURLY_WEATHER', hourly.data.list)
                commit('SET_DATES', dates)
            }
            return true

        },
        async getCityInformation ({ commit }, payload ) {
            const options = {
                near: `${payload.city},${payload.country}`,
                client_id: process.env.FORESQURE_CLIENT_ID,
                client_secret: process.env.FORESQURE_API_KEY,
                v: '20191209'
            };
            
            const result = await this.$axios.get('https://api.foursquare.com/v2/venues/search', options);
            return payload
        }
    }
  })
}

export default createStore

      