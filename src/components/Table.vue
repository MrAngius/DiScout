<template>
  <section>
    <h2 class="w3-teal banner">
      <i class="fa fa-cart-plus"></i> {{ focus.title }}
    </h2>
    <p>{{ focus.info }}</p>
    <!-- Product image preview -->
    <div id="triangles-container" ondrop="drop(event, this)" ondragover="allowDrop(event)">
      <div class="" style="visibility: hidden;">
        <img src="">
      </div>
      <div class="triangle" style="visibility: hidden; text-align: right;">
        <img src="">
      </div>
    </div>

    <!-- product table details -->
    <table class="w3-table w3-bordered" style="width: 100%;">
      <tr>
        <td>Original Price:</td>
        <td> {{ focus.price }}€</td>
        <td>Current Price:</td>
        <td> {{ focus.priceNow }}€</td>
        <td>Lowest Price:</td>
        <td> {{ focus.priceLower }}€</td>
      </tr>
      <tr :class="{ 'w3-hide': isNotVisible }">
        <td></td>
        <td> {{ compare.price }}€</td>
        <td></td>
        <td> {{ compare.priceNow }}€</td>
        <td></td>
        <td> {{ compare.priceLower }}€</td>
      </tr>

      <tr>
        <td>Rating:</td>
        <td> {{ focus.rating }}</td>
        <td>Discount:</td>
        <td> {{ focus.priceTrend }}%</td>
        <td>Saves:</td>
        <td> {{ focus.save }}€</td>
      </tr>
      <tr :class="{ 'w3-hide': isNotVisible }">
        <td></td>
        <td> {{ compare.rating }}</td>
        <td></td>
        <td> {{ compare.priceTrend }}%</td>
        <td></td>
        <td> {{ compare.save }}€</td>

      </tr>
      <tr>
        <td>Vendor:</td>
        <td> {{ focus.vendor }}</td>
        <td>Category:</td>
        <td> {{ focus.category }}</td>
        <td><a :href="focus.link">Link</a></td>

      </tr>
      <tr :class="{ 'w3-hide': isNotVisible }">
        <td></td>
        <td> {{ compare.vendor }}</td>
        <td></td>
        <td> {{ compare.category }}</td>
        <td :class="{ 'w3-hide': isNotVisible }"><a :href="compare.link">Link</a></td>

      </tr>
    </table>
  </section>
</template>

<script>
  export default {
    name: "table",
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
        },
      }
    }
  }
</script>

<style scoped>

</style>
