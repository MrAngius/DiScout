<template>
  <!-- TODO: flex layout may be broken on Chrome... image and price are not vertically centered. Verify cross-browser -->
  <div>
    <div class="vue-card-product" v-bind:draggable="isDraggable" v-on:dragstart="dragStart">
      <div itemscope itemtype="http://schema.org/Offer" id="product-clickable" v-on:click='focusCard'>
        <p class="title-box" v-text="name" itemprop="name"></p>
        <div class="vue-card-product-info">
          <div class="vue-card-image-box">
            <img itemprop="image" v-if="img_source" class='vue-card-product-image' :src="img_source" draggable="false">
            <img v-else class='vue-card-product-image' src="https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg" draggable="false">
          </div>
          <div itemprop="price" class="vue-card-summary-box">
            <!-- Add here other product useful information... -->
            <p class="w3-container">
              <span class="w3-text-red" style="text-decoration: line-through;">{{ price }}€</span><br>
              <span class="w3-text-teal"><span class="w3-xlarge">{{ price_current }}€</span> (-{{ off }}%)</span><br>
              <br>
              <span class="w3-text-yellow w3-xlarge fa fa-star"> {{ rating }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="vue-card-track" v-on:click='trackProduct'>
        <i class="fa fa-plus"></i> Track
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../main'
  export default {
    name: "card",
    props: {
      id: {
        type: Number,
        required: false
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      category: {
        type: String,
        required: false
      },
      vendor: {
        type: String,
        required: false
      },
      img_source: {
        type: String,
        required: false
      },
      link: {
        type: String,
        required: false
      },
      price_current: {
        type: String,
        required: false,
      },
      price: {
        type: String,
        required: false
      },
      off: {
        type: String,
        required: false
      },
      reduction: {
        type: String,
        required: false
      },
      rating: {
        type: String,
        required: false
      },
      id_similar_p: {
        type: Array,
        required: false
      },
      low_price: {
        type: String,
        required: false
      },
      type:{
        type: String,
        required: true
      }
    },
    computed:{
      isFocus: function () {
        return this.type==="tracked" || this.type==="general"
      },
      isDraggable: function () {
        return this.type==="tracked" || this.type==="suggested"
      }
    },
    methods: {
      focusCard: function(){
        bus.$emit('updateGraph', {id: this.id, isFocus: this.isFocus});
        bus.$emit('updateTable', this.$props, this.isFocus);
        bus.$emit('showModalEvent')
      },
      dragStart: function (ev) {
          ev.dataTransfer.setData('card', JSON.stringify(this.$props))
      },
      trackProduct: function () {
        let user=window.sessionStorage.getItem('user')
        if(user==null){
          bus.$emit('changepage', 'Login')
        }
        else{
          alert('new product')
          let email=JSON.parse(user).email.replace('@','at')
          let tracked=window.sessionStorage.getItem(email)
          let db;
          console.log(email)
          if(tracked==null){
            alert("Not found")
            db=loadDB(email)
          }
          // TODO db hardcoded, getting undefined at loading
          db={
            "0": {
              "low_price": "45",
              "name": "Veste de costume",
              "reduction": "7",
              "id": 0,
              "rating": "4.8",
              "category": "Vetements",
              "off": "12",
              "price_current": "48",
              "img_source": "img/products/product0.jpg",
              "price": "55",
              "vendor": "Zalando",
              "link": "https://www.zalando.fr/pier-one-blazer-dark-blue-pi922ba19-k11.html\n"
            },
            "1": {
              "low_price": "75",
              "name": "Tronconneuse a essence",
              "reduction": "21",
              "id": 1,
              "rating": "4.3",
              "category": "Tools",
              "off": "21",
              "price_current": "79",
              "img_source": "img/products/product1.jpg",
              "price": "100",
              "vendor": "ebay",
              "link": "https://www.ebay.fr/itm/Tronconneuse-a-essence-scie-20-puissance-62cc-Greencut/361876941810?_trkparms=pageci%253Ac4f738f5-fc57-11e7-b13d-74dbd1806d37%257Cparentrq%253A099109111610ab6b36d63221ffec5552%257Ciid%253A1\n"
            },
            "2": {
              "low_price": "210",
              "name": "Proscenic 790T Aspirateur Robot Puissant",
              "reduction": "60",
              "id": 2,
              "rating": "4.9",
              "category": "Home",
              "off": "21",
              "price_current": "219",
              "img_source": "img/products/product2.jpg",
              "price": "279",
              "vendor": "ebay",
              "link": "https://www.ebay.fr/itm/Proscenic-790T-Aspirateur-Robot-Puissant-Telecommande-Classe-energetique-A/142593633214?_trkparms=pageci%253Ac4f738f5-fc57-11e7-b13d-74dbd1806d37%257Cparentrq%253A099109111610ab6b36d63221ffec5552%257Ciid%253A1\n"
            },
            "3": {
              "low_price": "120",
              "name": "Liseuse Kindle Paperwhite",
              "reduction": "20",
              "id": 3,
              "rating": "4.3",
              "category": "Books and Music",
              "off": "13",
              "price_current": "129",
              "img_source": "img/products/product3.jpg",
              "price": "149",
              "vendor": "Amazon",
              "link": "https://www.amazon.fr/dp/B00QJDO0QC/ref=gw_Eink_Muscat_PMP17?pf_rd_p=a5e26dbb-2f1a-4271-9f78-085e52badb2f&pf_rd_r=PJS3GPPMWX4V1T55WAJK\n"
            }
          }
          console.log(db)

          // TODO this require the db properties and the card to be the same, which is not the case
          db[this.id]=this.$props
          console.log(db)
          window.sessionStorage.removeItem(email)
          window.sessionStorage.setItem(email,JSON.stringify(db))

        }
      }
    }
  }
</script>

<style scoped>

</style>
