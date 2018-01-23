<template>
  <div id="searchpage">
    <!-- FILTERS (mobile version) -->
    <filters type="mobile" v-bind:categories="categories" />
    <modal/>

    <!-- PAGE content -->
    <main id="page" class="has-sidebar w3-light-grey">
      <filters v-bind:categories="categories" type="tablet"/>
      <h2 id="page-title">
        Search results
      </h2>
      <product-list type="general" v-bind:categories="categories" />
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
          }
        }
      }
    }
</script>

<style scoped>

</style>
