<template>
  <!-- OVERLAY -->
  <!-- TODO not showing button i mobile mode -->
  <div>
    <div class="overlay" v-bind:style="{'display: block !important; visibility: visible !important;': showSideBar && !isMobile}" v-on:click="showSideBar=!showSideBar"></div>
    <div v-bind:data-open="showSideBar" v-bind:class="{'filtersSidebar': !isMobile, 'shifted-sidebar': !showSideBar&&!isMobile, 'w3-hide-large': isMobile, 'w3-hide-medium': isMobile, 'w3-pale-green': isMobile}">
      <button v-on:click="showSideBar=!showSideBar" v-bind:class="{'filtersSidebarButton': !isMobile, 'w3-grey':isMobile&&!showSideBar, 'w3-teal':isMobile&&showSideBar, 'w3-hover-teal w3-mobile w3-button':isMobile }">
        <i class="fa fa-search-plus w3-xlarge"></i>
      </button>
      <div class="filtersNavbar" v-bind:class="{'w3-hide':isMobile&&!showSideBar, 'w3-show':isMobile&&showSideBar, 'w3-padding': isMobile}" >
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
          <fieldset class="rating" v-on:click="()=>alert(this.rating.min)" >
            <!--template v-for="star in stars">
              <input type="radio" :id="'star'+star+'_'+type" :name="'rating_'+type" :value="star" />
              <label class="full" :for="'star'+star+'_'+type" :title="star + 'stars'"></label>
              <input type="radio" :id="'star'+(star-0.5)+'_'+type" :name="'rating_'+type" :value="(star-0.5)" />
              <label class="half" :for="'star'+(star-0.5)+'_'+type" :title="(star-0.5) + 'stars'"></label>
            </template-->
            <input type="radio" :id="'star5_'+type" :name="'rating_'+type" value="5" v-on:click="()=>rating.min=5"/>
            <label class="full" :for="'star5_'+type" title="5 stars"></label>
            <input type="radio" :id="'star4half_'+type" :name="'rating_'+type" value="4.5" v-on:click="()=>rating.min=4.5"/>
            <label class="half" :for="'star4half_'+type" title="4.5 stars"></label>
            <input type="radio" :id="'star4_'+type" :name="rating" value="4" v-on:click="()=>rating.min=4"/>
            <label class="full" for="'star4_'+type" title="4 stars"></label>
            <input type="radio" :id="'star3half_'+type" :name="'rating_'+type" value="3.5" v-on:click="()=>rating.min=3.5"/>
            <label class="half" :for="'star3half_'+type" title="3.5 stars"></label>
            <input type="radio" :id="'star3_'+type" :name="'rating_'+type" value="3" v-on:click="()=>rating.min=3"/>
            <label class="full" :for="'star3_'+type" title="3 stars"></label>
            <input type="radio" :id="'star2half_'+type" :name="'rating_'+type" value="2.5" v-on:click="()=>rating.min=2.5"/>
            <label class="half" :for="'star2half_'+type" title="2.5 stars"></label>
            <input type="radio" :id="'star2_'+type" :name="'rating_'+type" value="2" v-on:click="()=>rating.min=2"/>
            <label class="full" :for="'star2_'+type" title="2 stars"></label>
            <input type="radio" :id="'star1half_'+type" :name="'rating_'+type" value="1.5" v-on:click="()=>rating.min=1.5"/>
            <label class="half" :for="'star1half_'+type" title="1.5 stars"></label>
            <input type="radio" :id="'star1_'+type" :name="'rating_'+type" value="1" v-on:click="()=>rating.min=1"/>
            <label class="full" :for="'star1_'+type" title="1 star"></label>
            <input type="radio" :id="'starhalf_'+type" :name="'rating_'+type" value="0.5" v-on:click="()=>rating.min=0.5"/>
            <label class="half" :for="'starhalf_'+type" title="0.5 stars"></label>
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
            // TODO: create the price filter, in both the filters of the search page
            price: {
              min: 0,
              max: 9999
            },
            // TODO: create the filter search based on the names of the products (in order to insert the moving search bar)
            dispCat: true
            // NOTE: the "overlay" is not appearing anymore on medium-size screens...
          },
          showSideBar: false,
          stars:{
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5
          }
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
        },
        rating: {
          required: true,
          type: Object
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
          this.filters.price.max=9999;
          this.filters.rating.min=0
        }
      }
    }
</script>
<style scoped>

</style>
