<template>
  <div>
    <div class="vue-card-product" v-bind:draggable="isDraggable" v-on:dragstart="dragStart">
      <div itemscope itemtype="http://schema.org/Offer" id="product-clickable" v-on:click='focusCard'>
        <p class="title-box" v-text="name" itemprop="name"></p>
        <div class="vue-card-product-info">
          <div class="vue-card-image-box">
            <img itemprop="image" v-if="img_source" class='vue-card-product-image' :src="img_source" draggable="false">
            <img v-else class='vue-card-product-image'
                 src="https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg" draggable="false">
          </div>
          <div  class="vue-card-summary-box">
            <!-- Add here other product useful information... -->
            <p class="w3-container">
              <span class="w3-text-red" style="text-decoration: line-through;">{{ price }}€</span><br>
              <span class="w3-text-teal"><span itemprop="price" class="w3-xlarge">{{ price_current }}€</span> (-{{ off }}%)</span><br>
              <br>
              <span class="w3-text-yellow w3-xlarge fa fa-star">{{ rating }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="vue-card-track" v-on:click='trackProduct'  v-bind:class="{ 'w3-hide' : isTrackedValue }">
        <i class="fa fa-plus"></i> Track
      </div>
      <div class="vue-card-tracked" v-on:click='untrackProduct' v-bind:class="{ 'w3-hide' : !isTrackedValue }">
        <i class="fa fa-close"></i> Untrack
      </div>
    </div>
  </div>
</template>

<script>
  import {bus} from '../main'

  export default {
    name: "card",
    data(){
      return {
        isTrackedValue: isTracked(this.$props.id)
      }
    },
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
      type: {
        type: String,
        required: true
      }
    },
    created(){
    },
    mounted(){
    },
    computed: {
      isFocus: function () {
        return this.type === "tracked" || this.type === "general"
      },
      isDraggable: function () {
        return this.type === "tracked" || this.type === "suggested"
      }
    },
    methods: {
      // function to trigger events in order to update all the components
      focusCard: function () {
        bus.$emit('updateGraph', {id: this.id, isFocus: this.isFocus});
        bus.$emit('updateTable', this.$props, this.isFocus);
        bus.$emit('showModalEvent')
      },
      // DRAG AND DROP SUPPORT
      dragStart: function (ev) {
        ev.dataTransfer.setData('card', JSON.stringify(this.$props))
      },

      // functions to handle the tracking
      trackProduct: function () {
        trackAProduct(this.$props.id);
        this.isTrackedValue = true;
      },
      untrackProduct: function () {
        unTrackAProduct(this.$props.id);
        this.isTrackedValue = false;
      }
    }
  }
</script>
