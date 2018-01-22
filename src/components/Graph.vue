<template>
  <section class="w3-section">
    <h2 class="w3-blue banner">
      <i class="fa fa-line-chart"></i> Price Trend
    </h2>
    <div id="graph_buttons">
      <button @click="showRange(1, $event)">1 Month</button>
      <button @click="showRange(3, $event)">3 Month</button>
      <button @click="showRange(6, $event)">6 Month</button>
    </div>
    <div id="graph"></div>
  </section>
</template>

<script>
    export default {
        name: "graph"
    }
</script>

<style scoped>

</style>
