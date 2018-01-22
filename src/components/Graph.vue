<template>
  <section class="w3-section">
    <h2 class="w3-blue banner">
      <i class="fa fa-line-chart"></i> Price Trend
    </h2>
    <div id="graph_buttons">
      <button v-on:click="showRange(1)">1 Month</button>
      <button v-on:click="showRange(3)">3 Month</button>
      <button v-on:click="showRange(6)">6 Month</button>
    </div>
    <div id="graph"></div>
  </section>
</template>

<script>
  import {bus} from '../main'

  export default {
    name: "graph",
    data() {
      return {
        update: {
          1: {'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']},
          3: {'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']},
          6: {'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']}
        },
        layout: {
          xaxis: {
            range: ['2017-12-01 00:00:00', '2017-12-31 23:59:59'],
            type: 'date',
            rangeslider: {
              bgcolor: "#D6EAF8",
              thickness: 0.1,
              autorange: true,
              visible: false
            },
          },
          yaxis: {
            type: 'linear',
            // fixed tp avoid the user to mess up
            fixedrange: true,
            titlefont: {
              size: 10,
              color: "#2980B9"
            }
          },
          margin: {
            l: 30, b: 40, r: 30, t: 40,
          },
          legend: {
            font: {
              size: 14
            }
          }
        },
        colors: ['#f5b041', '#f4d03f', '#58d68d', '#52be80', '#45b39d', '#48c9b0', '#2874a6', '#1f618d', '#6c3483'],
        traces: 0
      }
    },
    mounted() {
      Plotly.newPlot('graph', [], this.layout, {displayModeBar: false})
      window.addEventListener('onresize', function () {
        console.log('Resized')
        Plotly.Plots.resize('graph')
      })
      bus.$on('updateGraph', updateGraph)
    },
    methods: {
      updateGraph: function () {

      },
      showRange: function (month) {
        Plotly.relayout(document.getElementById('graph'), this.update[month]);
      }

    }
  }
</script>

<style scoped>

</style>
