// use the addEvent listener to wait the load of the page before use JS

let graph;
let vueInstance1;

window.addEventListener('load', function (ev) {


    // handle the page using vue
    vueInstance1 = new Vue({
        el: "#vue-mytrack",
        data: {
            // these data need to be updated depending on the content
            productFocusTitle: "Smart Home Kit",
            productFocusInfo: "An Amazing product!",
            productFocusRating: 3.4,
            productFocusPrice: 120,
            productFocusPriceTrend: -15,
            productFocusPriceLower: 110,
            productFocusCategory: "Home, Electronic",
            productFocusVendor: "Amazon.fr",

            productFocusImageSrc: "./img/sample_images/door-window-homekit.jpg",
            productFocusLink: "https://superhome.com.au/shop/apple-homekit/homekit-door-window-sensor/",

            // comparison product
            productCompareRating: null,
            productComparePrice: null,
            productComparePriceTrend: null,
            productComparePriceLower: null,
            productCompareCategory: null,
            productCompareVendor: null,

            productCompareImageSrc: null,
            productCompareLink: null,

            isNotVisible: true,

            cards: [
            ],
            categories: {
                Accessories: true,
                Bags: true,
                Books_and_Music: true,
                Hi_tech: true,
                Home: true,
                Shoes: true,
                Sports: true,
                Tools: true,
                Toys: true,
                Vetements: true
            },

        },
        computed: {
            shortList: function(){
                console.log(this.cards);
                let tmp =  Object.entries(this.cards).slice(0,5).map(entry => entry[1]);
                console.log(tmp)
                return tmp

            }
        }

    });


    // ######## GRAPH ##########
    // extract data from the CSV, the graph need to be called when the data
    // has been extracted
    Plotly.d3.csv("./data/finance-charts-apple.csv", function(err, rows){

        // used to split the row and get the desired values
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        graph = document.getElementById("graph");

        let data = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.High'),
            line: {color: '#17BECF'}
        };


        let layout = {
            title: 'Basic Time Series',
            xaxis: {
                range: ['2016-07-01', '2016-12-31'],
                type: 'date'
            },
            yaxis: {
                autorange: true,
                range: [85, 140],
                type: 'linear'
            },
            margin: {                           // update the left, bottom, right, top margin
                l: 40, b: 80, r: 10, t: 80,
            }
        };

        Plotly.newPlot(graph, [data], layout);
    });

    loadDB('database.json');

});

// NOTE: probably is better to load it and store as web-store
function loadDB(database){
    //alert("Loading DB")
    Plotly.d3.json(database, function(e,data) {
        vueInstance1.cards = data.products;
    })
}

window.onresize = function() {
    Plotly.Plots.resize(graph);
};


function updateGraph(fileID) {
    // I need to retrieve the file from the fileID
    // TODO: take the id passed to the function and then update the graph

    // now if there is already a second trace we need to remove it first and then
    // get the data associated with the graph
    // IMPROVEMENT: possible to add multiple objects comparison

    Plotly.d3.csv("./data/finance-charts-apple.csv", function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        while (graph.data.length > 1) {
            Plotly.deleteTraces(graph, -1);
        }

        let trace_add = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, 'AAPL.Close'),
            line: {color: '#68ac56'}
        };

        Plotly.addTraces(graph, trace_add)
    })
}


// ######## DRAG AND DROP ########
function allowDrop(ev) {
    // enable the default action for drop
    ev.preventDefault();
}

function drag(ev, isFocus) {
    // used to send data
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("isFocus", isFocus)
}

function drop(ev) {
    ev.preventDefault();

    let data = ev.dataTransfer.getData("id");
    let type = ev.dataTransfer.getData("isFocus");

    if(type) {
        updateValuesFocus(data);
    } else {
        updateValuesComparisons(data);
    }
    updateGraph(data);

}


// TODO: need to make the function read the id of the object and retrieve the info

function updateValuesFocus(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    console.log(data);
    let productFocused = vueInstance1.$data.cards[data];

    console.log(productFocused);


    vueInstance1.$data.productFocusTitle = productFocused.name;
    //vueInstance1.$data.productFocusDescription = productFocused.description;
    vueInstance1.$data.productFocusPrice = productFocused.price;
    vueInstance1.$data.productFocusPriceLower = productFocused.low_price;
    vueInstance1.$data.productFocusRating = productFocused.rating;
    vueInstance1.$data.productFocusPriceTrend = productFocused.trend;
    vueInstance1.$data.productFocusVendor = productFocused.vendor;
    vueInstance1.$data.productFocusCategory = productFocused.category;
    vueInstance1.$data.productFocusLink = productFocused.link;
    vueInstance1.$data.productFocusImageSrc = productFocused.img_source;

}

function updateValuesComparisons(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    vueInstance1.$data.isNotVisible = false;
    console.log(data);
    // NOTE: hard coded for now
    let productCompared = vueInstance1.$data.cards[data];
    console.log(productCompared);


    vueInstance1.$data.productCompareTitle = productCompared.name;
    //vueInstance1.$data.productCompareDescription = productCompared.description;
    vueInstance1.$data.productComparePrice = productCompared.price;
    vueInstance1.$data.productComparePriceLower = productCompared.low_price;
    vueInstance1.$data.productCompareRating = productCompared.rating;
    vueInstance1.$data.productComparePriceTrend = productCompared.trend;
    vueInstance1.$data.productCompareVendor = productCompared.vendor;
    vueInstance1.$data.productCompareCategory = productCompared.category;
    vueInstance1.$data.productCompareLink = productCompared.link;
    vueInstance1.$data.productCompareImageSrc = productCompared.img_source;

}
