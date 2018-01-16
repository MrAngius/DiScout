// use the addEvent listener to wait the load of the page before use JS
window.addEventListener('load', function (ev) {

    // handle the page using vue
    new Vue({
        el: "#main-page",
        data: {
            productFocusTitle: "My brand new iPhone",
            productFocusInfo: "Some info of our product",
            graphTitle: "Price changes"
        },
        methods: {

        }
    });


    const graph = document.getElementById("graph");


    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows){
        var trace = {
            type: 'scatter',                    // set the chart type
            mode: 'lines',                      // connect points with lines
            x: rows.map(function(row){          // set the x-data
                return row['Time'];
            }),
            y: rows.map(function(row){          // set the x-data
                return row['10 Min Sampled Avg'];
            }),
            line: {                             // set the width of the line.
                width: 1
            }
        };

        var layout = {
            yaxis: {title: "Wind Speed"},       // set the y axis title
            xaxis: {
                showgrid: false,                  // remove the x-axis grid lines
                tickformat: "%B, %Y"              // customize the date format to "month, day"
            },
            margin: {                           // update the left, bottom, right, top margin
                l: 40, b: 80, r: 10, t: 20,
                pad: 0
            }
        };

        Plotly.plot(graph, [trace], layout, {showLink: false});
    });


});

