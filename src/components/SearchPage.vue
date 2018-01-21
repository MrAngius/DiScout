<template>
  <div id="searchpage">
    <!-- FILTERS (mobile version) -->
    <div class="w3-hide-large w3-hide-medium w3-pale-green">
      <button id="filtersNavButton" class="w3-grey w3-hover-teal w3-mobile w3-button" onclick="showHideTarget('filtersNavbar'); addRemoveClass(this, 'w3-grey'), addRemoveClass(this, 'w3-teal')">
        <i class="fa fa-search-plus w3-xlarge"></i>
      </button>
      <filters type="mobile"></filters>
    </div>
    <modal></modal>
    <!-- OVERLAY -->
    <div id="overlay" onclick="openCloseSidebar('filtersSidebar', 'overlay')"></div>

    <!-- PAGE content -->
    <main id="page" class="has-sidebar w3-light-grey">
      <filters type="tablet"></filters>
      <h2 id="page-title">
        Search results
      </h2>
      <product-list></product-list>
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
      }
    }
</script>

<style scoped>

</style>
