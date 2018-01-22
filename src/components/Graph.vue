<template>
  <section class="w3-section">
    <h2 class="w3-blue banner">
      <i class="fa fa-line-chart"></i> Price Trend
    </h2>
    <div id="graph_buttons">
      <button @click="showRange(1)">1 Month</button>
      <button @click="showRange(3)">3 Month</button>
      <button @click="showRange(6)">6 Month</button>
    </div>
    <div id="graph"></div>
  </section>
</template>

<script>
  export default {
    name: "graph",
    methods: {
      showRange: function (month) {
        let update;
        console.log(month);
        switch (month) {
          case 1:
            update = {
              'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
          case 3:
            update = {
              'xaxis.range': ['2017-10-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
          case 6:
            update = {
              'xaxis.range': ['2017-7-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
          default:
            update = {
              'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']
            };
            break;
        }
        Plotly.relayout(document.getElementById('graph'), update);
      }
    }
  }
</script>

<style scoped>

</style>
