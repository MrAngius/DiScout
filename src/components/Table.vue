<template>
  <div v-on:drop.prevent="itemDropped" v-on:dragover.prevent="()=>false">
    <h2 class="w3-teal banner">
      <i class="fa fa-cart-plus"></i> Details
    </h2>

    <!-- Notification settings menu -->
    <div v-if="!productPreview" id="notification-menu" class="details-container">
      <div class="details">
        <h3 class="w3-amber w3-container" v-on:click="isNotification = !isNotification"
            style="margin: 0; cursor: pointer">
          <i class="fa fa-bell-o w3-right" style="position: relative; top: 7px;"></i>Notification settings
        </h3>
        <form class="w3-padding" v-if="isNotification">
          <section>
            <label style="display: block;">Threshold: {{ threshold_value }}€</label>
            <input id="track_threshold" v-model="threshold_value" type="range" :min="threshold_min" :max="threshold_max"
                   step="1" style="width: 220px;"/>
          </section>
          <section>
            <span>Email notifications</span><br>

            <!-- <input id="track_email" type="checkbox" class="w3-check" /> -->
            <label class="switch">
              <input type="checkbox" id="mail_option" v-model="mail_notifications">
              <span class="slider round"></span>
            </label>
          </section>
          <section>
            <span v-if="settingsSaved" class="w3-text-teal">Settings saved!</span><br>
            <button type="button" class="w3-button w3-light-blue w3-hover-teal" v-on:click="saveTrackingSettings()">
              <i class="fa fa-check"></i> Save settings
            </button>
          </section>
        </form>
      </div>
    </div>

    <!-- Product image preview -->
    <div>
      <!-- Product table details -->
      <div itemscope itemtype = "http://schema.org/Offer" class="details-container">
        <div class="details">
          <div class="w3-blue product-name" v-if="!productPreview" itemprop = 'name'>{{ focus.title }}</div>
          <!-- image -->
          <div class="product-image-preview" v-if="!productPreview">
            <div class="image-container" v-if="isOn">
              <img itemprop="image" v-bind:src="focus.img_source" draggable="false">
            </div>
          </div>
          <!-- details -->
          <div v-bind:class="{ 'w3-left' : !productPreview }">
            <p v-bind:class="{'w3-container': productPreview}">
              <span class="w3-text-red">Original Price</span><br class="w3-hide-medium w3-hide-large">
              <span class="w3-text-red" style="text-decoration: line-through;">{{ focus.price }}€</span><br>
              <span class="w3-text-teal w3-xlarge">Current Price</span><br class="w3-hide-medium w3-hide-large">
              <span class="w3-text-teal w3-xlarge"><span itemprop = "price">{{ focus.priceNow }}€</span></span><br>
              <span class="w3-text-gray w3-large">Discount:</span><br class="w3-hide-medium w3-hide-large">
              <span class="w3-text-gray w3-large"> {{ focus.priceTrend }}%</span>
            </p>
            <!-- additional details-->
            <p v-bind:class="{'w3-container': productPreview}">
              <span class="w3-text-yellow w3-xlarge"><span class="fa fa-star"> {{ focus.rating }}</span></span><br>
              <span>Category: <span itemprop = "category">{{ focus.category }}</span></span><br>
              <span>Sold by: <span itemprop = "seller" itemscope itemtype="http://schema.org/Organization"><span itemprop="name">{{ focus.vendor }} </span></span>(<a :href="focus.link" target="_blank">link</a>)</span>
            </p>
          </div>

        </div>
      </div>

      <!-- This is the compared product -->
      <div itemscope itemtype = "http://schema.org/Offer" v-if="!productPreview" v-bind:class="{ 'w3-hide': !comparing, 'details-container': true}">
        <div class="details">
          <div class="w3-red product-name" itemprop = "name">{{ compare.title }}</div>
          <!-- image -->
          <div class="product-image-preview">
            <div class="image-container" v-if="isOn">
              <img itemprop = "image" v-bind:src="compare.img_source" draggable="false">
            </div>
          </div>
          <!-- details -->
          <div v-bind:class="{ 'w3-left' : !productPreview }">
            <p v-bind:class="{'w3-container': productPreview}">
              <span class="w3-text-red">Original Price</span><br class="w3-hide-medium w3-hide-large">
              <span class="w3-text-red" style="text-decoration: line-through;">{{ compare.price }}€</span><br>
              <span class="w3-text-teal w3-xlarge">Current Price</span><br class="w3-hide-medium w3-hide-large">
              <span class="w3-text-teal w3-xlarge"><span itemprop = "price">{{ compare.priceNow }}€</span></span><br>
              <span class="w3-text-gray w3-large">Discount:</span><br class="w3-hide-medium w3-hide-large">
              <span class="w3-text-gray w3-large"> {{ compare.priceTrend }}%</span>
            </p>
            <!-- additional details-->
            <p v-bind:class="{'w3-container': productPreview}">
              <span class="w3-text-yellow w3-xlarge"><span class="fa fa-star"> {{ compare.rating }}</span></span><br>
              <span>Category: <span itemprop = "category">{{ compare.category }}</span></span><br>
              <span>Sold by: <span itemprop = "seller" itemscope itemtype="http://schema.org/Organization"><span itemprop="name">{{ compare.vendor }} </span></span>(<a :href="compare.link" target="_blank">link</a>)</span>
            </p>
          </div>
<!--
          <div class="w3-left">
            <p>
              <span class="w3-text-red" style="text-decoration: line-through;">{{ compare.price }}€</span><br>
              <span class="w3-text-teal"><span class="w3-xlarge">{{ compare.priceNow }}€</span> (-{{ compare.priceTrend }}%)</span>
            </p>
            <p>
              <span class="w3-text-yellow w3-xlarge"><span class="fa fa-star"> {{ compare.rating }}</span></span><br>
              <span>Category: <span itemprop = "category">{{ compare.category }}</span></span><br>
              <span>Sold by: <span itemprop = "seller" itemscope itemtype="http://schema.org/Organization"><span itemprop="name">{{ compare.vendor }}</span></span>(<a :href="focus.link" target="_blank">link</a>)</span>
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {bus} from '../main'

  export default {
    name: "vue-table",
    props: {
      productPreview: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
        focus: {
          title: null,
          info: null,
          rating: null,
          price: null,
          trend: null,
          priceNow: null,
          priceTrend: null,
          save: null,
          priceLower: null,
          category: null,
          vendor: null,
          link: null,
          img_source: null
        },
        compare: {
          title: null,
          info: null,
          rating: null,
          price: null,
          trend: null,
          priceNow: null,
          priceTrend: null,
          save: null,
          priceLower: null,
          category: null,
          vendor: null,
          link: null,
          img_source: null
        },
        comparing: false,
        isOn: false,
        // to hide and show the notification
        isNotification: false,
        threshold_value: 80,
        mail_notifications: false,
        threshold_min: 0,
        threshold_max: 100,
        settingsSaved: false
      }
    },
    created() {
      bus.$on('updateTable', this.updateTable)
    },
    methods: {

      itemDropped: function (ev) {
        let data = JSON.parse(ev.dataTransfer.getData("card"));
        bus.$emit('updateGraph', {id: data.id, isFocus: data.type === "tracked" || data.type === "general"});
        bus.$emit('updateTable', data, data.type === "tracked" || data.type === "general");
      },
      // update the table depending on the selected product
      updateTable: function (data, isFocus) {
        let tmp = {
          title: data.name,
          info: data.description,
          rating: data.rating,
          price: data.price,
          priceNow: data.price_current,
          priceTrend: data.off,
          save: data.reduction,
          priceLower: data.low_price,
          category: data.category,
          vendor: data.vendor,
          link: data.link,
          img_source: data.img_source,
          id: data.id
        };

        this.isOn = true;
        bus.$emit('showingProduct', true);
        this.settingsSaved = false;

        if (isFocus) {
          this.focus = tmp;
          this.comparing = false;
          this.threshold_max = tmp.price;
          this.threshold_value = Math.round(tmp.price * 0.8);
        }
        else {
          this.comparing = true;
          this.compare = tmp
        }
      },
      // save the tracking and show a message
      saveTrackingSettings: function () {
        this.settingsSaved = true;
      }
    }
  }
</script>

<style scoped>

</style>
