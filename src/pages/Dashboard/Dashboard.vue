<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h6 slot="header" class="title">Welcome to Tellor Playground</h6>
          <div class="row">
            <div class="col-md-2 mt-2">
              <h4>Contract address</h4>
            </div>
            <div class="col-md-4 mt-2">
              <base-input v-model="currentContractAddress"></base-input>
            </div>
            <div class="col-md-2 mt-1">
              <base-button  @click="updateContractAddress"> Update </base-button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <h4>Request ID</h4>
            </div>
            <div class="col-md-2">
              <base-input v-model="form.submitValue.id"></base-input>
            </div>
            <div class="col-md-2">
              <h4>Value</h4>
            </div>
            <div class="col-md-2">
              <base-input v-model="form.submitValue.value"></base-input>
            </div>
            <div class="col-md-4">
              <base-button class="ml-2" @click="getNewValueCountbyRequestId">Value count</base-button>
              <base-button class="btn-primary ml-2" @click="submitValue">Submit</base-button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <h4>Timestamp</h4>
            </div>
            <div class="col-md-2">
              <base-input v-model="form.getCurrentValue.timestamp"></base-input>
            </div>
            <div class="col-md-2">
              <h4>Index</h4>
            </div>
            <div class="col-md-2">
              <base-input v-model="form.getCurrentValue.index"></base-input>
            </div>
            <div class="col-md-4">
              <base-button class="mr-2" @click="getTimestampbyRequestIDandIndex">Get timestamp</base-button>
              <base-button @click="retrieveData">Current</base-button>
            </div>
          </div>
          <div class="row" v-if="form.result !== null">
            <div class="col-md-12">
              <h4>{{ form.result }}</h4>
            </div>
          </div>
        </card>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      currentContractAddress: '',
      form: {
        result: null,
        submitValue: {
          id: 0,
          value: 0,
        },
        getCurrentValue: {
          timestamp: 0,
          index: 0,
        }
      }
    }
  },
  computed: {
    ...mapState([
      'settings',
      'services',
    ])
  },
  mounted() {
    this.currentContractAddress = this.settings.tellorPlaygroundAddress;
  },
  methods: {
    async getNewValueCountbyRequestId(){
      const value = await this.services.tellorPlayground.getNewValueCountbyRequestId(
          this.form.submitValue.id
      );
      console.log('value: ', value);
      this.form.result = `Value count: ${value}`;
      this.form.getCurrentValue.index = value - 1;
    },
    updateContractAddress(){
      this.settings.tellorPlaygroundAddress = this.currentContractAddress;
      this.services.tellorPlayground.buildFromAddress(this.currentContractAddress);
    },
    async retrieveData() {
      const value = await this.services.tellorPlayground.retrieveData(
          this.form.submitValue.id,
          this.form.getCurrentValue.timestamp);
      console.log('current value: ', value);
      this.form.result = `Current value: ${value}`;
    },
    async getTimestampbyRequestIDandIndex() {
      const value = await this.services.tellorPlayground.getTimestampbyRequestIDandIndex(
          this.form.submitValue.id,
          this.form.getCurrentValue.index);
      console.log('timestamp: ', value);
      this.form.getCurrentValue.timestamp = value;
      this.form.result = `Timestamp: ${value}`;
    },
    async submitValue() {
      try {
        this.services.tellorPlayground.submitValue(
            this.form.submitValue.id,
            this.form.submitValue.value,
            this.onTransactionHash,
            this.onReceipt,
            this.onError,
        );
      } catch (error) {
        this.$notifyMessage('danger', error);
      }
    },
    onTransactionHash(transactionHash) {
      console.log('transaction hash: ', transactionHash);
      this.$notifyMessage('success', 'Transaction submitted.');
    },
    onReceipt(receipt) {
      console.log('receipt: ', receipt);
      this.$notifyMessage('success', 'Receipt received.');
    },
    onError(error) {
      console.error(error);
      this.$notifyMessage('danger', error.toString());
    },
  },
};
</script>
