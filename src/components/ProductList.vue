<template>
  <div id="product-list" :style="style_resize" >
    <!-- TODO fix callbacks -->
    <card v-for="card in cards"
          v-bind:class="{'vue-card-container': general, 'vue-card-tracked-product': tracked, 'vue-card-suggested-product': suggested}"
          v-if="showOrCat(card.category)" :ref='"ref_prod" + card.id'
          :id="card.id" :name="card.name" :price_current="card.price_current" :img_source='"static/" + card.img_source'
          :low_price="card.low_price" :reduction="card.reduction" :rating="card.rating" :category="card.category"
          :off="card.off" :price="card.price" :vendor="card.vendor" :link="card.link" :type="type"></card>
  </div>
</template>

<script>
  import Card from './Card'

  export default {
    name: "product-list",
    components: {
      'card': Card
    },
    data() {
      return {
        cards: {},
        show: true
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
      showOrCat: function (cat) {
        return this.show && this.categories[cat.replace(/[^A-Za-z0-9]/gi, '')]
      },
    },
    created() {
      this.cards=loadDB('static/database_production/product_db.json')
    }
  }
</script>

<style scoped>
.sudgested {}
</style>
