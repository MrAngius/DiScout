<template>
  <div id="modal" class="w3-modal" v-bind:class="{'w3-hide': !show, 'w3-show': show}" >
    <div class="w3-modal-content">
      <span v-on:click="show=!show" class="w3-button w3-display-topright w3-teal w3-hover-red w3-large">&times;</span>
      <div id="zoomed-product">
        <!-- More details -->
        <vue-table :productPreview="true"/>
        <!-- The graph --->
        <vue-graph :productPreview="true" :page="'Tracking'"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../main'
  import Graph from './Graph'
  import Table from './Table'

    export default {
      name: "vue-modal",
      components: {
        'vue-graph': Graph,
        'vue-table': Table
      },
      data() {
        return{
          focus: {
            title: null,
            info: null,
            rating: null,
            price: null,
            trend: null,
            priceNow: null,
            save: null,
            priceLower: null,
            category: null,
            vendor: null,
            link: null,
          },
          show: false
        }
      },
      created(){
        bus.$on('showModalEvent', this.showModal)
      },
      methods:{
        showRange: function (value, event) {
          setHistory(value)
        },
        showModal: function () {
          this.show=true;
        }
      }
    }
</script>

<style scoped>

</style>
