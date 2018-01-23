<template>
  <!-- OVERLAY -->
  <!-- TODO not showing button i mobile mode -->
  <div>
    <div id="overlay" v-if="showSideBar&&!isMobile" v-on:click="showSideBar=!showSideBar"></div>
    <div v-bind:data-open="showSideBar" id="filtersSidebar" v-bind:class="{'shifted-sidebar': !showSideBar&&!isMobile, 'w3-hide-large': isMobile, 'w3-hide-medium': isMobile, 'w3-pale-green': isMobile}">
      <button v-bind:id="filterButton" v-on:click="showSideBar=!showSideBar" v-bind:class="{'w3-grey':isMobile&&!showSideBar, 'w3-teal':isMobile&&showSideBar, 'w3-hover-teal':isMobile, 'w3-mobile w3-button':isMobile }">
        <i class="fa fa-search-plus w3-xlarge"></i>
      </button>
      <div id="filtersNavbar" v-bind:class="{'w3-hide':isMobile&&!showSideBar, 'w3-show':isMobile&&showSideBar, 'w3-padding': isMobile}" >
        <header>
          <h2>FILTERS</h2>
        </header>
        <section class="filter">
          <span v-on:click="filters.dispCat=!filters.dispCat">
              <i class="fa" v-bind:class="{'fa-caret-right': !filters.dispCat, 'fa-caret-down': filters.dispCat}"></i> Categories
          </span>
          <div class="filter-options" v-if="filters.dispCat">
            <label v-for="filter in filters.categories" v-bind:class="{'w3-text-blue': categories[filter.id], 'w3-text-blue-grey': !categories[filter.id]}">

              <input :id="strippedID(filter.id)" type="checkbox" v-model="categories[filter.id]" class="w3-check"/>
              {{ filter.name }}
            </label>
          </div>
        </section>
        <section class="filter">
          Minimum rating
          <fieldset class="rating">
            <input type="radio" id="star5" name="rating" value="5" />           <label class="full" for="star5" title="5 stars"></label>
            <input type="radio" id="star4half" name="rating" value="4.5" />     <label class="half" for="star4half" title="4.5 stars"></label>
            <input type="radio" id="star4" name="rating" value="4" />           <label class="full" for="star4" title="4 stars"></label>
            <input type="radio" id="star3half" name="rating" value="3.5" />     <label class="half" for="star3half" title="3.5 stars"></label>
            <input type="radio" id="star3" name="rating" value="3" />           <label class="full" for="star3" title="3 stars"></label>
            <input type="radio" id="star2half" name="rating" value="2.5" />     <label class="half" for="star2half" title="2.5 stars"></label>
            <input type="radio" id="star2" name="rating" value="2" />           <label class="full" for="star2" title="2 stars"></label>
            <input type="radio" id="star1half" name="rating" value="1.5" />     <label class="half" for="star1half" title="1.5 stars"></label>
            <input type="radio" id="star1" name="rating" value="1" />           <label class="full" for="star1" title="1 star"></label>
            <input type="radio" id="starhalf" name="rating" value="0.5" />      <label class="half" for="starhalf" title="0.5 stars"></label>
          </fieldset>
        </section>
        <section class="filter-buttons">
          <button class="w3-button w3-light-blue w3-hover-red" v-on:click="checkAll(false)">Delete</button>
          <button class="w3-button w3-light-blue w3-hover-teal" v-on:click="checkAll(true)">View all</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../main'
    export default {
      name: "filters",
      data(){
        return{
          filters: {
            categories:[
              {
                id: 'Accessories',
                name: 'Accessories'
              },
              {
                id: 'Bags',
                name: 'Bags'
              },
              {
                id: 'BooksandMusic',
                name: 'Books and Music'
              },
              {
                id: 'Hitech',
                name: 'Hi-tech'
              },
              {
                id: 'Home',
                name: 'Home'
              },
              {
                id: 'Shoes',
                name: 'Shoes'
              },
              {
                id: 'Sports',
                name: 'Sports'
              },
              {
                id: 'Tools',
                name: 'Tools'
              },
              {
                id: 'Toys',
                name: 'Toys'
              },
              {
                id: 'Vetements',
                name: 'Vetements'
              }
            ],
            price: {
              min: 0,
              max: 1000
            },
            rating: 0,
            dispCat: true
          },
          showSideBar: false
        }
      },
      props:{
        categories:{
          required: true,
          type: Object
        },
        type: {
          required: true,
          type: String
        }
      },
      computed: {
        isMobile: function () {
          return this.type=="mobile"
        },
        filterButton: function () {
          return this.isMobile ? 'filtersNavButton' : 'filtersSidebarButton'
        }

      },
      methods:{
        strippedID: function (id) {
          return id.replace(/[^A-Za-z0-9]/gi, '')
        },
        checkAll: function(status){
          for(let category in this.categories){
            let check=document.getElementById(category);
            if(check.checked!==status){
              check.click()
            }
          }
          this.filters.price.min=0;
          this.filters.price.max=1000;
          this.filters.rating=0
        }
      }
    }
</script>
<style scoped>

</style>
