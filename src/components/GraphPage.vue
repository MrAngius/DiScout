<template>
  <main id="page" class="w3-row">

    <aside id="tracked-products">
      <p>
        <i class="fa fa-binoculars"></i> Your tracked products
      </p>
      <product-list v-bind:categories="categories" type="tracked"/>
    </aside>

    <!-- GRAPHS, DETAILS, OTHER PRODUCTS -->
    <div id="track-page">

      <!-- TRACKED PRODUCT DETAIL -->
      <!-- NOTE: style for debug purpose only -->
      <div ondrop="drop(event)" ondragover="allowDrop(event)">

        <!-- DETAILS -->
        <vue-table/>

        <!-- GRAPH -->
        <vue-graph :page="'Tracking'"/>
      </div>

      <!-- SIMILAR PRODUCTS -->
      <section id="similar-products-slider">
        <!--
            SLIDER BUTTONS (draft)
            <button class="w3-button w3-circle w3-grey w3-hover-blue w3-xlarge w3-left" style="position: relative; top: 188px"><</button>
            <button class="w3-button w3-circle w3-grey w3-hover-blue w3-xlarge w3-right" style="position: relative; top: 188px">></button>
        -->

        <!-- Here, we need to know the exact number of products that will be printed in the suggestion list -->
        <product-list v-bind:style="'width: ' + Object.entries(cards).length * 320 + 'px;'" v-bind:categories="categories" type="suggested"/>
      </section>
    </div>
    </main>
</template>

<script>
  import ProductList from "./ProductList";
  import Graph from "./Graph";
  import Table from "./Table";

    export default {
      components: {
        'product-list': ProductList,
        'vue-graph': Graph,
        'vue-table': Table
      },
      name: "vue-graph-page",
      data() {
        return{
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
          cards: {}
        }
      }
    }
</script>

<style scoped>

</style>
