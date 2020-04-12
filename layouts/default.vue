<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      app
      color="primary"
    >
      <p
        class="white--text text-sm-center mb-0" style="font-size:12px">&copy; {{ new Date().getFullYear() }} | MG</p>
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
