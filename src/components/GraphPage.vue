<template>
  <!-- MAIN CONTAINER -->
  <main id="page" class="w3-row">
    <aside id="tracked-products" v-bind:class="{'w3-hide': !tracklistOpen}">
      <div id="tracked-banner">
        <i class="fa fa-binoculars" v-on:click="tracklistOpen=!tracklistOpen""></i> Your tracked products
      </div>
      <div class="w3-panel w3-justify">
        Click on one of the tracked product, to see extra information
      </div>
      <!-- TODO: clicking on a tracked product, I want to close the list! -->
      <product-list v-bind:categories="categories" type="tracked"/>
    </aside>

    <!-- Collapsed version (just the button) -->
    <button id="collapsed-tracklist" v-bind:class="{'w3-hide': tracklistOpen}" v-on:click="tracklistOpen=!tracklistOpen">
      <i class="fa fa-binoculars"></i>
    </button>

    <!-- GRAPHS, DETAILS, OTHER PRODUCTS -->
    <div id="track-page">
      <!-- DETAILS -->

      <vue-table/>
      <!-- GRAPH -->
      <!-- TODO: the graph is working, but it raises an exception in the console. 6 times per click... -->
      <vue-graph/>
      <!-- SIMILAR PRODUCTS -->
      <h2 class="w3-red banner">
        <i class="fa fa-lightbulb-o"></i> Suggested products
      </h2>
      <div id="instructions">
        Click on a suggested product (or drag it into the graph) to compare it with the tracked one
      </div>
      <section id="similar-products-slider">
        <!--
            SLIDER BUTTONS (draft)
            <button class="w3-button w3-circle w3-grey w3-hover-blue w3-xlarge w3-left" style="position: relative; top: 188px"><</button>
            <button class="w3-button w3-circle w3-grey w3-hover-blue w3-xlarge w3-right" style="position: relative; top: 188px">></button>
        -->
        <!-- Here, we need to know the exact number of products that will be printed in the suggestion list -->
        <product-list v-bind:categories="categories" type="suggested"/>
      </section>
    </div>
  </main>
</template>

<script>
  import ProductList from "./ProductList";
  import Graph from "./Graph";
  import Table from "./Table";
  import Functions from '../mixin.js';


  export default {
    components: {
      'product-list': ProductList,
      'vue-graph': Graph,
      'vue-table': Table
    },
    name: "vue-graph-page",
    mixins: [Functions],
    data() {
      return {
        categories: {
          Accessories: true,
          Bags: true,
          BooksandMusic: true,
          Hitech: true,
          Home: true,
          Shoes: true,
          Sports: true,
          Tools: true,
          Toys: true,
          Vetements: true
        },
        cards: {},
        tracklistOpen: true
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
