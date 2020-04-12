<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Weather Forecast'
    }
  }
}
</script>
