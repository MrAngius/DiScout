<template>
  <div>
    <div class="vue-card-product" v-bind:draggable="isDraggable" v-on:dragstart="dragStart">
      <div id="product-clickable" v-on:click='focusCard'>
        <p class="title-box" v-text="name"></p>
        <div class="vue-card-product-info">
          <div class="vue-card-image-box">
            <img v-if="img_source" class='vue-card-product-image' :src="img_source" draggable="false">
            <img v-else class='vue-card-product-image' src="https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg" draggable="false">
          </div>
          <div class="vue-card-summary-box">
            <!-- Add here other product useful information... -->
            <div v-if="price_current" v-text="price_current + '€'"></div>
            <div v-if="off" v-text="off"></div>
          </div>
        </div>
      </div>
      <div class="vue-card-track">
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
      onclick_callback: {
        type: String,
        required: false
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
        bus.$emit('updateGraph', {id: this.id, isFocus: this.isFocus})
        bus.$emit('updateTable', this.$props, this.isFocus)
        bus.$emit('showModalEvent')
      },
      dragStart: function (ev) {
        ev.dataTransfer.setData("id", this.id);    // product id
        ev.dataTransfer.setData("img_src", this.img_source);  // product image
        ev.dataTransfer.setData("isFocus", this.isFocus);
      }
    }
  }
</script>

<style scoped>

</style>
