<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h6 slot="header" class="title">Welcome to Tellor Tracker</h6>
          <div class="row">
            <div class="col-md-12">
              <h5>Track a new data point</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <base-input label="Tellor ID" v-model="trackId"></base-input>
            </div>
            <div class="col-md-2">
              <base-input label="Name" v-model="trackName"></base-input>
            </div>
            <div class="col-md-2">
              <base-button class="mt-4" @click="trackNew">
                <font-awesome-icon icon="plus-circle"/>
              </base-button>

            </div>
          </div>
          <base-table :columns="keys" :data="dataPoints"></base-table>
        </card>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";
import BaseTable from "@/components/BaseTable";

export default {
  components: {
    BaseTable,
    FadeTransition
  },
  data() {
    return {
      keys: ['id', 'name', 'index', 'timestamp', 'value'],
      dataPoints: [],
      trackId: 0,
      trackName: '',
    }
  },
  computed: {
    ...mapState([
      'settings',
      'services',
    ])
  },
  async mounted() {
    this.dataPoints = await this.services.tellorTracker.load();
    console.log('dataPoints loaded');
    console.log(this.dataPoints);
  },
  methods: {
    async trackNew(){
      this.services.tellorTracker.trackNew(this.trackId, this.trackName);
      this.dataPoints = await this.services.tellorTracker.load();
    },
  },
};
</script>
