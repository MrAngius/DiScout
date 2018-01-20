// use the addEvent listener to wait the load of the page before use JS

let graph;
let vueInstance1;

window.addEventListener('load', function (ev) {


    // handle the page using vue
    vueInstance1 = new Vue({
        el: "#vue-mytrack",
        data: {
            // these data need to be updated depending on the content
            productFocusTitle: null,
            productFocusInfo: null,
            productFocusRating: null,
            productFocusPrice: null,
            productFocusPriceTrend: null,
            productFocusPriceLower: null,
            productFocusCategory: null,
            productFocusVendor: null,

            productFocusImageSrc: null,
            productFocusLink: null,

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
            // TODO: define a better way to create this list!!
            shortList: function(){
                return Object.entries(this.cards).slice(0,5).map(entry => entry[1]);


            }
        }

    });


    // ######## GRAPH ##########
    // extract data from the CSV, the graph need to be called when the data
    // has been extracted
    Plotly.d3.csv("./data_graphs_production/data_products/data_0.csv", function(err, rows){

        // used to split the row and get the desired values
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }


        graph = document.getElementById("graph");

        let data = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'date'),
            y: unpack(rows, 'value'),
            line: {color: '#17BECF'}
        };


        let layout = {
            title: 'Basic Time Series',
            xaxis: {
                range: ['2017-01-01 00:00:00', '2017-12-31 23:59:59'],
                type: 'date'
            },
            yaxis: {
                type: 'linear'
            },
            margin: {
                l: 40, b: 80, r: 10, t: 80,
            }
        };

        Plotly.newPlot(graph, [], layout);

    });

    loadDB('database_production/product_db.json');

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

// IMPROVEMENT: improve the graph style
function updateGraph(fileID) {
    // I need to retrieve the file from the fileID
    // TODO: take the id passed to the function and then update the graph

    // now if there is already a second trace we need to remove it first and then
    // get the data associated with the graph
    // IMPROVEMENT: possible to add multiple objects comparison


    Plotly.d3.csv("./data_graphs_production/data_products/data_" + fileID +".csv", function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }


        while (graph.data.length > 1) {
            Plotly.deleteTraces(graph, -1);
        }

        let trace_add = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'date'),
            y: unpack(rows, 'value'),
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
    ev.dataTransfer.setData("id", ev.target.parentNode.getAttribute("data-id"));
    ev.dataTransfer.setData("isFocus", isFocus);
}

function drop(ev) {
    ev.preventDefault();

    let data = ev.dataTransfer.getData("id");
    alert(ev);
    console.log(data);

    let type = ev.dataTransfer.getData("isFocus");
    console.log(type);

    if(type === "true") {
        updateValuesFocus(data);
    } else {
        updateValuesComparisons(data);
    }
    updateGraph(data);

}

// add a function to make the product selection working also with the click
// NOTE: possible to remove the isFocus and retrieve this info from the id
function clickProduct(ev, isFocus){

    let data = ev.target.id;
    // TODO: parse the ID depending on the arrival location

    if(isFocus === "true") {
        updateValuesFocus(data);
    } else {
        updateValuesComparisons(data);
    }
    //updateGraph(data);


}


// TODO: need to make the function read the id of the object and retrieve the info

function updateValuesFocus(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    let productFocused = vueInstance1.cards[data];

    console.log( "the selected id is " + data);


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
    // NOTE: hard coded for now
    let productCompared = vueInstance1.cards[data];
    console.log(productCompared);
    console.log( "the compared id is " + data);


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
