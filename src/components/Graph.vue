<template>
  <div class="w3-section" v-on:drop.prevent="itemDropped" v-on:dragover.prevent="()=>false">
    <h2 class="w3-blue banner">
      <i class="fa fa-line-chart"></i> Price Trend
    </h2>
    <p id="graph_buttons" v-bind:class="{'w3-container': productPreview }">
      <button v-on:click="showRange('1')" class="w3-button w3-light-blue w3-hover-blue w3-round">1 Month</button>
      <button v-on:click="showRange('3')" class="w3-button w3-light-blue w3-hover-blue w3-round">3 Month</button>
      <button v-on:click="showRange('6')" class="w3-button w3-light-blue w3-hover-blue w3-round">6 Month</button>
    </p>
    <div ref="thegraph" id="graph"></div>
  </div>
</template>

<script>
  import {bus} from '../main'

  export default {
    name: "graph",
    props: {
      productPreview: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
        update: {
          1: {'xaxis.range': ['2017-12-01 00:00:00', '2017-12-31 23:59:59']},
          3: {'xaxis.range': ['2017-10-01 00:00:00', '2017-12-31 23:59:59']},
          6: {'xaxis.range': ['2017-7-01 00:00:00', '2017-12-31 23:59:59']}
        },
        layout: {
          xaxis: {
            range: ['2017-12-01 00:00:00', '2017-12-31 23:59:59'],
            type: 'date',
            rangeslider: {
              bgcolor: "#D6EAF8",
              thickness: 0.1,
              autorange: true,
              visible: true
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

      }
    },
    created() {
    },
    mounted() {
      Plotly.newPlot("graph", [], this.layout, {displayModeBar: false});

      // update the graph slider in case we open the page from a mobile support
      showHideSlider("graph");

      // adding a listener in order to add and remove the slider
      window.addEventListener('resize', function () {
        Plotly.Plots.resize("graph");
        showHideSlider("graph");
      });
      bus.$on('updateGraph', this.updateGraph)
    },
    methods: {
      itemDropped: function (ev) {
        let data = JSON.parse(ev.dataTransfer.getData("card"));
        bus.$emit('updateGraph', {id: data.id, isFocus: data.type === "tracked" || data.type === "general"});
        bus.$emit('updateTable', data, data.type === "tracked" || data.type === "general")
      },

      updateGraph: function (data) {
        let theGraph=this.$refs.thegraph;
        Plotly.Plots.resize(theGraph);

        // NOTE: what does it do?
        if(theGraph===null)
          return;

        // determine how to proceed
        let i = data.isFocus===true ? 0 : 1;

        // delete the trace to update
        while(theGraph.data.length > i){
          Plotly.deleteTraces(theGraph, -1)
        }

        // add the trace
        let self = this;
        Plotly.d3.csv("static/data_graphs_production/data_products/data_" + data.id + ".csv",
          function (err, rows) {
            function unpack(rows, key) {
              return rows.map((row) => row[key])
            }

            // the trace to add
            let traceAdd = {
              type: "scatter",
              name: data.isFocus ? 'Tracked' : 'Compared',
              showlegend: true,
              mode: "lines",
              x: unpack(rows, 'date'),
              y: unpack(rows, 'value'),
              line: {color: self.colors[self.traces]}
            };
            // plotting
            Plotly.addTraces(theGraph, traceAdd);
          })

      },
      showRange: function (month) {
        Plotly.relayout("graph", this.update[month]);
      },
    }
  }
</script>

<style scoped>

</style>
