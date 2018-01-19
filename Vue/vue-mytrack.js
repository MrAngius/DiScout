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
            productFocusInfo: "The best product to automatize your Hose!",
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

    loadDB('database.json')

});


function loadDB(database){
    //alert("Loading DB")
    Plotly.d3.json(database, function(e,data) {
        vueInstance1.$data.cards = data.products
        /* Following code is used to insert categories dynamically, not working atm */
        /*
        for (var i = 0; i < data.products.length; i++) {
            var cat = data.products[i].category
            vue.categories[cat] = true
        }
        */

    })
}

window.onresize = function() {
    Plotly.Plots.resize(graph);
};

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
const fakeObjectComparisons = {
    id: 3,
    title: "La piu Brutta",
    description: "Leeeeeeena",
    product_category: "Home, ART",
    product_vendor: "Magazino",
    img_src: "./img/sample_images/lena.jpg",
    product_link: "",
    price: "Undefined",
    trend: 50000,
    rating: 20,
    id_similar_p: [5, 3, 2],
    lowest_price: 999999999,
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

function drag(ev) {
    // used to send data
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    // retrieve the information
    let data = ev.dataTransfer.getData("id");

    // call a function for updating the values
    updateValuesComparisons(data);
    updateGraph(data);
}

// TODO: need to make the function read the id of the object and retrieve the info

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

}

function updateValuesComparisons(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    vueInstance1.$data.isNotVisible = false;

    vueInstance1.$data.productCompareTitle = fakeObjectComparisons.title;
    vueInstance1.$data.productCompareDescription = fakeObjectComparisons.description;
    vueInstance1.$data.productComparePrice = fakeObjectComparisons.price;
    vueInstance1.$data.productComparePriceLower = fakeObjectComparisons.lowest_price;
    vueInstance1.$data.productCompareRating = fakeObjectComparisons.rating;
    vueInstance1.$data.productComparePriceTrend = fakeObjectComparisons.trend;
    vueInstance1.$data.productCompareVendor = fakeObjectComparisons.product_vendor;
    vueInstance1.$data.productCompareCategory = fakeObjectComparisons.product_category;
    vueInstance1.$data.productCompareLink = fakeObjectComparisons.product_link;
    vueInstance1.$data.productCompareImageSrc = fakeObjectComparisons.img_src;

}
