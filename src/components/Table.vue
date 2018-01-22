<template>
  <section>
    <h2 class="w3-teal banner">
      <i class="fa fa-cart-plus"></i> {{ focus.title }}
    </h2>
    <p>{{ focus.info }}</p>
    <!-- Product image preview -->
    <div id="triangles-container" v-on:drop.prevent="drop($event)" v-on:dragover.prevent="()=>false" v-if="isOn">
      <div v-bind:class="{'triangle': comparing}">
        <img v-bind:src="focus.img_source">
      </div>
      <div class="triangle" style="text-align: right" v-if="comparing">
        <img v-bind:src="compare.img_source">
      </div>
    </div>

    <!-- product table details -->
    <table class="w3-table w3-bordered" style="width: 100%;">
      <tr>
        <td>Original Price:</td>
        <td> {{ focus.price }}€</td>
        <td>Current Price:</td>
        <td> {{ focus.priceNow }}€</td>
        <td>Lowest Price:</td>
        <td> {{ focus.priceLower }}€</td>
      </tr>
      <tr v-if="comparing">
        <td></td>
        <td> {{ compare.price }}€</td>
        <td></td>
        <td> {{ compare.priceNow }}€</td>
        <td></td>
        <td> {{ compare.priceLower }}€</td>
      </tr>

      <tr>
        <td>Rating:</td>
        <td> {{ focus.rating }}</td>
        <td>Discount:</td>
        <td> {{ focus.priceTrend }}%</td>
        <td>Saves:</td>
        <td> {{ focus.save }}€</td>
      </tr>
      <tr v-if="comparing">
        <td></td>
        <td> {{ compare.rating }}</td>
        <td></td>
        <td> {{ compare.priceTrend }}%</td>
        <td></td>
        <td> {{ compare.save }}€</td>

      </tr>
      <tr>
        <td>Vendor:</td>
        <td> {{ focus.vendor }}</td>
        <td>Category:</td>
        <td> {{ focus.category }}</td>
        <td><a :href="focus.link">Link</a></td>

      </tr>
      <tr v-if="comparing">
        <td></td>
        <td> {{ compare.vendor }}</td>
        <td></td>
        <td> {{ compare.category }}</td>
        <td><a :href="compare.link">Link</a></td>

      </tr>
    </table>
  </section>
</template>

<script>
  import {bus} from '../main'

  export default {
    name: "vue-table",
    data() {
      return {
        focus: {
          title: null,
          info: null,
          rating: null,
          price: null,
          trend: null,
          priceNow: null,
          priceTrend: null,
          save: null,
          priceLower: null,
          category: null,
          vendor: null,
          link: null,
          img_source: null
        },
        compare: {
          title: null,
          info: null,
          rating: null,
          price: null,
          trend: null,
          priceNow: null,
          priceTrend: null,
          save: null,
          priceLower: null,
          category: null,
          vendor: null,
          link: null,
          img_source: null
        },
        comparing: false,
        isOn: false
      }
    },
    created() {
      bus.$on('updateTable', this.updateTable)
    },
    methods: {
      updateTable: function (data, isFocus) {
        let tmp = {
          title: data.name,
          info: data.description,
          rating: data.rating,
          price: data.price,
          priceNow: data.price_current,
          priceTrend: data.off,
          save: data.reduction,
          priceLower: data.low_price,
          category: data.category,
          vendor: data.vendor,
          link: data.link,
          img_source: data.img_source
        }
        this.isOn=true


        if (isFocus) {
          this.focus = tmp
        }
        else {
          this.comparing=true
          this.compare = tmp
        }
      },
      drop(ev){
        let data = ev.dataTransfer.getData("id");
        // get the product image
        let image = ev.dataTransfer.getData("img_source");
        // get the type of drag'n drop operation
        let type = ev.dataTransfer.getData("isFocus");


        if(type === "true") {
          // we want to update information about the main product
          setMainImageOnly(image);
          updateValuesFocus(data);
          updateGraph(data, "focus");
        } else {
          // we want to compare the main product with another one
          setOtherImage(image);
          updateValuesComparisons(data);
          updateGraph(data, "comparison");
        }
      }
    }
  }
</script>

<style scoped>

</style>
