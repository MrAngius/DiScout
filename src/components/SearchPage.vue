<template>
  <div id="searchpage">
    <!-- FILTERS (mobile version) -->
    <filters type="mobile" v-bind:categories="categories" v-bind:rating="rating" />
    <modal/>

    <!-- PAGE content -->
    <main id="page" class="has-sidebar w3-light-grey">
      <filters v-bind:categories="categories" v-bind:rating="rating" type="tablet"/>
      <h2 id="page-title">
        Search results
      </h2>
      <product-list type="general" v-bind:categories="categories" v-bind:rating="rating" />
    </main>
  </div>
</template>

<script>
  import Filters from './Filters'
  import Modal from './Modal'
  import ProductList from './ProductList'
    export default {
      name: "vue-search-page",
      components:{
        'filters': Filters,
        'modal': Modal,
        'product-list': ProductList
      },
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
          rating: {
            min: 0
          }
        }
      }
    }
</script>

<style scoped>

</style>
