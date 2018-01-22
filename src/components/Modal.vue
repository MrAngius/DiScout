<template>
  <!-- TODO just copy and pasted. -->
  <div id="modal" class="w3-modal" v-bind:class="{'w3-hide': !show, 'w3-show': show}" >
    <div class="w3-modal-content">
      <span v-on:click="show=!show" class="w3-button w3-display-topright w3-teal w3-hover-red w3-large">&times;</span>
      <div id="zoomed-product">
        <section class="w3-row">
          <h2 class="w3-teal w3-container w3-round"><i class="fa fa-cart-plus"></i> {{ focus.title }}</h2>
          <p>{{ focus.info }}</p>
          <!-- Product image preview -->
          <div id="triangles-container" ondrop="drop(event, this)" ondragover="allowDrop(event)">
            <div class="" style="visibility: hidden;">
              <img src="">
            </div>
            <div class="triangle" style="visibility: hidden; text-align: right;">
              <img src="">
            </div>
          </div>

          <div class="w3-rest">
            <!-- product table details -->
            <table class="w3-table w3-bordered ">
              <tr>
                <td>Original Price:</td><td> {{ focus.price }}€ </td>
                <td>Current Price:</td> <td> {{ focus.priceNow }}€ </td>
                <td>Lowest Price:</td><td> {{ focus.priceLower }}€ </td>
              </tr>
              <tr>
                <td>Rating:</td><td> {{ focus.rating }} </td>
                <td>Discount:</td><td> {{ focus.trend }}% </td>
                <td>Saves:</td><td> {{ focus.save }}€ </td>
              </tr>
              <tr>
                <td>Vendor:</td><td> {{ focus.vendor }} </td>
                <td>Category:</td><td> {{ focus.category }} </td>
                <td> <a v-bind:href="focus.link">Link</a></td>

              </tr>
            </table>
          </div>

        </section>


        <!-- GRAPH -->
        <section class="w3-section">
          <h2 class="w3-blue w3-container w3-round"><i class="fa fa-line-chart"></i> Price Trend</h2>
          <div>
            <button v-on:click="showRange(1, $event)">1Month</button>
            <button v-on:click="showRange(3, $event)">3Month</button>
            <button v-on:click="showRange(6, $event)">6Month</button>

          </div>
          <div id="graph"></div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../main'
    export default {
      name: "vue-modal"
      ,
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
