// COLORS
const COLORS = ['#f5b041','#f4d03f','#58d68d','#52be80','#45b39d','#48c9b0','#2874a6','#1f618d','#6c3483'];
const COLORS2 = ['#aed6f1','#a9cce3','#d2b4de','#d7bde2','#f5b7b1','#e6b0aa','#fad7a0','#f9e79f','#abebc6'];
const COLORS3 = ['#a9dfbf','#a2d9ce','#a3e4d7','#5dade2','#5499c7','#a569bd','#af7ac5','#ec7063','#cd6155'];

let LAYOUT = {
    xaxis: {
        range: ['2017-12-01 00:00:00', '2017-12-31 23:59:59'],
        type: 'date',
        rangeslider: {
            bgcolor: "#D6EAF8",
            thickness: 0.20,
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
        l: 40, b: 80, r: 10, t: 50,
    },
    legend: {
        font: {
            size: 14
        }
    }
};


// declarations
let graph;
let vue;
let countTraces;
let sliderHide;

// use the addEvent listener to wait the load of the page before use JS
window.addEventListener('load', function (ev) {

    countTraces = 0;
    sliderHide = true;

    // handle the page using vue
    vue = new Vue({
        el: "#vue-mytrack",
        data: {
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

    // graph
    graph = document.getElementById("graph");
    Plotly.newPlot(graph, [], LAYOUT, {displayModeBar: false});


    loadDB('database_production/product_db.json');

});

// NOTE: probably is better to load it and store as web-store
function loadDB(database){
    //alert("Loading DB")
    Plotly.d3.json(database, function(e,data) {
        vue.cards = data.products;
    })
}

window.onresize = function() {
    Plotly.Plots.resize(graph);
};


// ######## GRAPH ##########
function addTrace(fileID, name){

    Plotly.d3.csv("./data_graphs_production/data_products/data_" + fileID +".csv", function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        let traceAdd = {
            type: "scatter",
            name: name,
            showlegend: true,
            mode: "lines",
            x: unpack(rows, 'date'),
            y: unpack(rows, 'value'),
            line: {color: COLORS[countTraces]}
        };
        countTraces ++;
        Plotly.addTraces(graph, traceAdd);


    });
}

function removeTrace(flush) {

    if (!flush){
        Plotly.deleteTraces(graph, -1);
        countTraces --;
    } else {
        while (countTraces !== 0){
            Plotly.deleteTraces(graph, -1);
            countTraces --;
        }
    }
}

function showHideRangeSlider(){

    let update = {
        'xaxis.rangeslider.visible': sliderHide
    };

    sliderHide = !sliderHide;

    Plotly.relayout(graph, update);
}

// IMPROVEMENT: improve the graph style
function updateGraph(fileID, mode) {
    // I need to retrieve the file from the fileID
    // TODO: take the id passed to the function and then update the graph

    // now if there is already a second trace we need to remove it first and then
    // get the data associated with the graph
    // IMPROVEMENT: possible to add multiple objects comparison

    if (mode === "comparison"){
        if (countTraces > 1){
            removeTrace(false)
        }
        addTrace(fileID, "Compared");

    } else {
        removeTrace(true);
        addTrace(fileID, "Tracked")
    }

    if (sliderHide) {
        showHideRangeSlider();
    }

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
        updateGraph(data, "focus");

    } else {
        updateValuesComparisons(data);
        updateGraph(data, "comparison");
    }

}

// add a function to make the product selection working also with the click
function clickProduct(elem, isFocus){

    let data = elem.parentNode.parentNode.getAttribute("data-id");
    console.log(data);

    if(isFocus === "true") {
        updateValuesFocus(data);
        updateGraph(data, "focus");

    } else {
        updateValuesComparisons(data);
        updateGraph(data, "comparison");

    }
}


// TODO: need to make the function read the id of the object and retrieve the info
// ###### UPDATES ######
function updateValuesFocus(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    let productFocused = vue.cards[data];

    vue.productFocusTitle = productFocused.name;
    //vue.$data.productFocusDescription = productFocused.description;
    vue.productFocusPrice = productFocused.price;
    vue.productFocusPriceLower = productFocused.low_price;
    vue.productFocusRating = productFocused.rating;
    vue.productFocusPriceTrend = productFocused.off;
    vue.productFocusVendor = productFocused.vendor;
    vue.productFocusCategory = productFocused.category;
    vue.productFocusLink = productFocused.link;
    vue.productFocusImageSrc = productFocused.img_source;

}

function updateValuesComparisons(data) {
    // TODO: Based on the object ID we need to retrieve its information and
    // use them to populate the information on the graph and in the table

    vue.isNotVisible = false;
    let productCompared = vue.cards[data];
    console.log(data);

    vue.productCompareTitle = productCompared.name;
    //vue.$data.productCompareDescription = productCompared.description;
    vue.productComparePrice = productCompared.price;
    vue.productComparePriceLower = productCompared.low_price;
    vue.productCompareRating = productCompared.rating;
    vue.productComparePriceTrend = productCompared.off;
    vue.productCompareVendor = productCompared.vendor;
    vue.productCompareCategory = productCompared.category;
    vue.productCompareLink = productCompared.link;
    vue.productCompareImageSrc = productCompared.img_source;
}
