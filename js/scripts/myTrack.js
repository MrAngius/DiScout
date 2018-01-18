// use the addEvent listener to wait the load of the page before use JS

let graph;

window.addEventListener('load', function (ev) {

    // handle the page using vue
    vueInstance1 = new Vue({
        el: "#main-page",
        data: {
            // these data need to be updated depending on the content
            productFocusTitle: "Smart Home Kit",
            productFocusInfo: "The best product to automatize your Hose!",
            productFocusRating: 3.4,
            productFocusPrice: 120,
            productFocusPriceTrend: -15,
            productFocusPriceLower: 110,
            productFocusCategory: "Home, Electronic",
            productFocusVendor: "Amazon.fr",

            productFocusImageSrc: "./img/sample_images/door-window-homekit.jpg",
            productFocusLink: "https://superhome.com.au/shop/apple-homekit/homekit-door-window-sensor/",
        }
    });


    //######## GRAPH ##########

    graph = document.getElementById("graph");

    Plotly.d3.csv("./data/finance-charts-apple.csv", function(err, rows){


        // used to split the row and get the desired values
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        let trace1 = {
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

        let data = [trace1, trace2];

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



// NOTE: consider this as the basic reference of an object
const fakeObject = {
    id: 1,
    title: "La piu bella Cosa",
    description: "Booooooooooooo",
    product_category: "Home, Plubelle",
    product_vendor: "Amazino",
    img_src: "./img/sample_images/laplusbelle.jpg",
    product_link: "",
    price: 10000,
    trend: 50,
    rating: 5,
    id_similar_p: [5, 3, 2],
    lowest_price: 9999,
};


function updateGraph(fileID) {

    Plotly.d3.csv("./data/finance-charts-apple.csv", function (err, rows) {

        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        let trace_add= {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.Close'),
            line: {color: '#68ac56'}
        };

        Plotly.addTraces(graph, trace_add)

    })
}



//######## DRAG AND DROP ########
function allowDrop(ev) {
    // enable the default action for drop
    ev.preventDefault();
}

function drag(ev) {
    // used to send data
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    // retrieve the information
    let data = ev.dataTransfer.getData("id");

    // call a function for updating the values
    updateValues(data);
    updateGraph(data);
}

function updateValues(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    vueInstance1.$data.productFocusTitle = fakeObject.title;
    vueInstance1.$data.productFocusDescription = fakeObject.description;
    vueInstance1.$data.productFocusPrice = fakeObject.price;
    vueInstance1.$data.productFocusPriceLower = fakeObject.lowest_price;
    vueInstance1.$data.productFocusRating = fakeObject.rating;
    vueInstance1.$data.productFocusPriceTrend = fakeObject.trend;
    vueInstance1.$data.productFocusVendor = fakeObject.product_vendor;
    vueInstance1.$data.productFocusCategory = fakeObject.product_category;
    vueInstance1.$data.productFocusLink = fakeObject.product_link;
    vueInstance1.$data.productFocusImageSrc = fakeObject.img_src;

    alert(data.toString())
}