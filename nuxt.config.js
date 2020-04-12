import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  mode: 'universal',
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    DATA: process.env.DATA
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style.styl',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/vue-moment.js',
      ssr: true
    },
    {
      src: '@/filter/filter.js',
      ssr: true
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /**
   * axios configuration
   */
  axios: {
    credentials: false,
    proxyHeaders: false,
    proxy: true,
    debug: true,
    retry: {
      retries: 0
    },
    headers: {
      'Content-Type': 'application/x-gzip;',
      'Accept-Type': 'gzip'
    },
    requestInterceptor: (config, {store}) => {
      config.headers.common['Authorization'] = ''
      config.headers.common['Content-Type'] = 'application/x-gzip;application/x-www-form-urlencoded;application/json'
      config.headers.common['Accept-Type'] = 'gzip'
      config.headers.common['Accept-Encoding'] = 'false'
      return config
    }
  },
  proxy: {
    '/weather/': { target: process.env.WEATHER_BASE_URL, pathRewrite: { '^/weather/' : '' }},
    '/foresquare/': { target: process.env.FORESQURE_BASE_URL, pathRewrite: { '^/foresquare/': '' }}
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
