<template>
  <div id="searchpage">
    <!-- FILTERS (mobile version) -->
    <div v-bind:class="{ 'w3-hide' : !alreadySubmit }">
      <filters type="mobile" v-bind:categories="categories" v-bind:rating="rating" v-bind:price="price"/>
    </div>
    <modal/>

    <!-- PAGE content -->
    <main id="page" class="has-sidebar w3-light-grey">
      <filters v-bind:categories="categories" v-bind:rating="rating" type="tablet" v-bind:price="price"
               v-bind:search="searchtext"/>
      <div id="parent">
        <form ref="searchBar" id="search" v-on:submit="doASearch($event)">
          <input type="text" class="w3-input w3-border w3-round-xlarge w3-center w3-cell" placeholder="Search a product"
                 v-model="searchtext.text">
        </form>
      </div>
      <h2 id="page-title">
        Search page
      </h2>
      <div v-bind:class="{ 'w3-hide' : !alreadySubmit }">
        <product-list type="general" v-bind:categories="categories" v-bind:rating="rating" v-bind:price="price"
                      v-bind:search="searchtext"/>
      </div>
    </main>
  </div>
</template>

<script>
  import Filters from './Filters'
  import Modal from './Modal'
  import ProductList from './ProductList'

  export default {
    name: "vue-search-page",
    components: {
      'filters': Filters,
      'modal': Modal,
      'product-list': ProductList
    },
    data() {
      return {
        // filters criteria
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
        },
        // used to understand if the user has already start a search
        alreadySubmit: false
      }
    },

    methods: {
      doASearch: function (event) {
        event.preventDefault();

        if(this.$refs.searchBar.firstChild.value) {
          this.$refs.searchBar.style.top = "16px";
          setTimeout(this.visualizeProducts, 1200);
        }
      },

      visualizeProducts: function () {
        this.alreadySubmit = true;
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

  @media (max-width: 600px) {
    #page {
      min-height: 490px;
    }
  }
</style>
