import Vuex from 'vuex'


const state = () => ({
    locationWeather: null,
})

const createStore = () => {
  return new Vuex.Store({
    state: state,
    mutations: {
        SET_LOCATION_WEATHER (state, payload) {
            state.locationWeather = { ...payload }
        }
    },
    getters: {
        GET_LOCATION_WEATHER (state) {
            state.locationWeather
        }
    },
    actions: {
        getLocationWeather ({ commit }, payload ) {

        },
        async getCityInformation ({ commit }, payload ) {
            const options = {
                near: `${payload.city},${payload.country}`,
                client_id: process.env.FORESQURE_CLIENT_ID,
                client_secret: process.env.FORESQURE_API_KEY,
                v: '20191209'
            };
            
            console.log(payload)
            const result = await this.$axios.get('http://api.foursquare.com/v2/venues/search', options);
            console.log(result)
        }
    }
  })
}

export default createStore

      