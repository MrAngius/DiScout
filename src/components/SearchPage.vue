<template>
  <div id="searchpage">
    <!-- FILTERS (mobile version) -->
    <filters type="mobile" v-bind:categories="categories" v-bind:rating="rating" v-bind:price="price"/>
    <modal/>

    <!-- PAGE content -->
    <main id="page" class="has-sidebar w3-light-grey">
      <filters v-bind:categories="categories" v-bind:rating="rating" type="tablet" v-bind:price="price" v-bind:search="searchtext"/>
      <div id="parent">
        <div id="search">
          <input type="text" class="w3-input w3-border w3-round-xlarge w3-center w3-cell" placeholder="Search a product" v-model="searchtext.text">
          <button class="w3-button w3-grey w3-hover-blue w3-circle w3-cell w3-xlarge">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div><h2 id="page-title">
        Search results
      </h2>
      <product-list type="general" v-bind:categories="categories" v-bind:rating="rating" v-bind:price="price" v-bind:search="searchtext" v-bind:database="'product_db'"/>
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
          },
          price: {
            threshold_min: 0,
            threshold_max: 1000,
            value: 1000
          },
          searchtext: {
            text: ""
          }
        }
      }
    }
</script>

<style scoped>
  #parent {
    position: relative;
  }

  #search {
    position: absolute;
    top: 200px;
    width: 100%;
    padding: 0 10%;

    transition-property: top;
    transition-duration: 1.2s;
    transition-timing-function: ease;
  }

  #search button {
    position:absolute;
    top: -6px;
    right: 10%;
  }
</style>
