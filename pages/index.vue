<template>
  <div class="w-main-bg">
    <page-container>
      <div class="py-5">
        <v-layout row wrap>
          <v-flex md3 sm5 xs12>
            <!-- search input -->
            <search-field/>
          </v-flex>
        </v-layout>
          <div v-if="$store.state.loading && !$store.state.locationWeather">
            <v-layout row wrap justify-center align-center style="min-height:500px">
              <v-progress-circular 
                size="100"
                indeterminate color="white"></v-progress-circular>
            </v-layout>
          </div>
          <div 
            v-if="$store.state.locationWeather"
            class="w-container">
            <switch-temp></switch-temp>
            
            <!-- main -->
            <temp-details></temp-details>
            
            <div style="height:4px;">
              <v-progress-linear
                v-show="$store.state.loading"
                color="white"
                :indeterminate="true"></v-progress-linear>
            </div>

            <!-- others -->
            <div class="sub-details grey--text">
              <v-layout row wrap>
                <v-flex 
                  md3 sm3
                  class="text-center">
                  <sun-details></sun-details>
                </v-flex>
                <v-flex
                  md9 sm9
                  class="text-center">

                  <!-- forecast -->
                  <hourly></hourly>
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
import TempDetails from "~/components/TempDetails.vue"
import SunDetails from "~/components/SunDetails.vue"

export default {
  components: {
    PageContainer,
    SearchField,
    Hourly,
    SwitchTemp,
    TempGraph,
    TempDetails,
    SunDetails
  }
}
</script>