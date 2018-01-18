// use the addEvent listener to wait the load of the page before use JS
window.addEventListener('load', function (ev) {

    // handle the page using vue
    new Vue({
        el: "#main-page",
        data: {
            productFocusTitle: "Smart Home Kit",
            productFocusInfo: "The best product to automatize your Hose!",
            productRating: 3.4,
            productPrice: 120,
            productPriceTrend: -15,
            productPriceLower: 110,
            productCategory: "Home, Electronic",
            productVendor: "Amazon.fr",
            productImageSrc: "./img/sample_images/door-window-homekit.jpg",
            productLink: "https://superhome.com.au/shop/apple-homekit/homekit-door-window-sensor/",
            graphTitle: "Price changes",

        },
        methods: {

        }
    });


    const graph = document.getElementById("graph");

    Plotly.d3.csv("./data/finance-charts-apple.csv", function(err, rows){

        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        const trace1 = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.High'),
            line: {color: '#17BECF'}
        };

        const trace2 = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.Low'),
            line: {color: '#7F7F7F'}
        };


        let data = [trace1,trace2];

        let layout = {
            title: 'Basic Time Series',
            yaxis: {title: "Temperatures"},       // set the y axis title
            xaxis: {
                showgrid: false,                  // remove the x-axis grid lines
                tickformat: "%B, %Y"              // customize the date format to "month, day"
            },
            margin: {                           // update the left, bottom, right, top margin
                l: 40, b: 80, r: 10, t: 80,
            }
        };

        Plotly.newPlot(graph, data, layout);
    })

});

