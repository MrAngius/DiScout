<template>
  <!-- used to generate the list of products dynamically -->
  <div id="product-list" :style="style_resize" >
    <card v-for="card in cards"
          v-bind:class="{'vue-card-container': general, 'vue-card-tracked-product': tracked, 'vue-card-suggested-product': suggested, 'w3-hide' : !showing(card)}"
          :ref='"ref_prod" + card.id'
          :id="card.id" :name="card.name" :price_current="card.price_current" :img_source='"static/" + card.img_source'
          :low_price="card.low_price" :reduction="card.reduction" :rating="card.rating" :category="card.category"
          :off="card.off" :price="card.price" :vendor="card.vendor" :link="card.link" :type="type"></card>
  </div>
</template>

<script>
  import Card from './Card'
  import { bus } from '../main'

  export default {
    name: "product-list",
    components: {
      'card': Card
    },
    data() {
      return {
        cards: {},
        show: true,
        cardLoaded: false
      }
    },
    props:{
      categories:{
        required: false,
        type: Object
      },
      type:{
        required: true,
        type: String
      },
      rating: {
        required: true,
        type: Object
      },
      price: {
        type: Object,
        required: true
      },
      search: {
        type: Object,
        required: true
      }
    },
    computed:{
      // needed for the list in order to adapt dynamically
      style_resize: function () {
        if (this.type === "suggested"){
          return 'width: ' + Object.entries(this.cards).length * 320 + 'px;'
        } else {
          return ""
        }
      },
      // functions to discriminate where we are generating the list
      tracked: function () {
        return this.type==="tracked"
      },
      general: function () {
        return this.type==="general"
      },
      suggested: function () {
        return this.type==="suggested"
      }
    },
    methods: {
      // APPLY FILTERS
      showing: function (card) {
        return this.show &&
          this.categories[card.category.replace(/[^A-Za-z0-9]/gi, '')] &&
          card.rating >= this.rating.min &&
          parseInt(card.price_current) <= this.price.value &&
          card.name.toLowerCase().includes(this.search.text.toLowerCase())
      },

      // create products
      loadCards: function () {
        this.cards = JSON.parse(sessionStorage.getItem("database"));

        // if tracked we modify the list of products to show
        if (this.tracked) {
          let card_list = Object.values(this.cards);

          this.cards = card_list.filter(val => isTracked(val.id));
        }

        // discrimination in the case of suggested products
        if (this.suggested) {
          let card_list = Object.values(this.cards);

          this.cards = card_list.filter(val => !isTracked(val.id));

        }
      }
    },
    // loading from the json and saving in the SessionStorage: we have to listen to an event due to the
    // Plotly.d3.json() function is asynchronous
    created() {
      if (sessionStorage.getItem("database")){
        this.loadCards()
      } else {
        bus.$on('DBLOADED', this.loadCards);
      }
    }
  }
</script>

<style scoped>
</style>
