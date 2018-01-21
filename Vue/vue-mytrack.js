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
            productFocusPriceNow: null,
            productFocusSave: null,
            productFocusPriceLower: null,
            productFocusCategory: null,
            productFocusVendor: null,
            productFocusLink: null,

            productCompareRating: null,
            productComparePrice: null,
            productComparePriceTrend: null,
            productComparePriceNow: null,
            productCompareSave: null,
            productComparePriceLower: null,
            productCompareCategory: null,
            productCompareVendor: null,
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
        },
        methods: {
            showRange: function (value, event) {
                setHistory(value)
            }
        }

    });

    // graph
    graph = document.getElementById("graph");
    Plotly.newPlot(graph, [], LAYOUT, {displayModeBar: false});


    loadDB('database_production/product_db.json');

});


window.onresize = function() {
    Plotly.Plots.resize(graph);
};

// TODO: I would like to define "productImageContainer" as a global constant... but this script is loaded before the DOM elements!

// use this function to set the top-left product image
function setMainImage(src) {
    const productImageContainer = document.getElementById('triangles-container');
    productImageContainer.firstChild.style.visibility = 'visible';
    productImageContainer.firstChild.firstChild.src = src;
}

// use this function to set the bottom-right product image
function setOtherImage(src) {
    const productImageContainer = document.getElementById('triangles-container');
    productImageContainer.firstChild.classList.add('triangle');
    productImageContainer.lastChild.style.visibility = 'visible';
    productImageContainer.lastChild.firstChild.src = src;
}

// use this image to set an image only (without triangles)
function setMainImageOnly(src) {
    setMainImage(src);
    const productImageContainer = document.getElementById('triangles-container');
    productImageContainer.firstChild.classList.remove('triangle');
    productImageContainer.lastChild.style.visibility = 'hidden';
}

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

function setHistory(month) {
    let update;

    console.log(month);

    switch (month){
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
    Plotly.relayout(graph, update);
}

// ######## DRAG AND DROP ########
function allowDrop(ev) {
    // enable the default action for drop
    ev.preventDefault();
}

function drag(ev, isFocus) {
    // used to send data
    ev.dataTransfer.setData("id", ev.target.parentNode.getAttribute("data-id"));    // product id
    ev.dataTransfer.setData("img_src", ev.target.parentNode.getAttribute("data-image"));  // product image
    ev.dataTransfer.setData("isFocus", isFocus);
}

function drop(ev) {
    ev.preventDefault();

    // get the product ID
    let data = ev.dataTransfer.getData("id");
    alert(ev);
    console.log(data);

    // get the product image
    let image = ev.dataTransfer.getData("img_src");
    console.log(image);

    // get the type of drag'n drop operation
    let type = ev.dataTransfer.getData("isFocus");
    console.log(type);


    if(type === "true") {
        // we want to update information about the main product
        setMainImageOnly(image);
        updateValuesFocus(data);
        updateGraph(data, "focus");
    } else {
        // we want to compare the main product with another one
        setOtherImage(image);
        updateValuesComparisons(data);
        updateGraph(data, "comparison");
    }

}

// ####### ONCLICK ########
function clickProduct(elem, isFocus){

    // get the product image
    let image = elem.parentNode.parentNode.getAttribute("data-image");
    console.log(image);

    // get the data product data-id
    let data = elem.parentNode.parentNode.getAttribute("data-id");
    console.log(data);

    if(isFocus === "true") {
        setMainImageOnly(image);
        updateValuesFocus(data);
        updateGraph(data, "focus");

    } else {
        setOtherImage(image);
        updateValuesComparisons(data);
        updateGraph(data, "comparison");

    }
}


// TODO: need to make the function read the id of the object and retrieve the info
// ####### UPDATES #######

function updateValuesFocus(data) {
    vue.isNotVisible = true;
    let productFocused = vue.cards[data];

    vue.productFocusTitle = productFocused.name;
    //vue.$data.productFocusDescription = productFocused.description;
    vue.productFocusPrice = productFocused.price;
    vue.productFocusPriceNow = productFocused.price_current;
    vue.productFocusPriceLower = productFocused.low_price;
    vue.productFocusSave = productFocused.reduction;
    vue.productFocusRating = productFocused.rating;
    vue.productFocusPriceTrend = productFocused.off;
    vue.productFocusVendor = productFocused.vendor;
    vue.productFocusCategory = productFocused.category;
    vue.productFocusLink = productFocused.link;

}

function updateValuesComparisons(data) {
    vue.isNotVisible = false;
    let productCompared = vue.cards[data];

    vue.productCompareTitle = productCompared.name;
    //vue.$data.productCompareDescription = productCompared.description;
    vue.productComparePrice = productCompared.price;
    vue.productComparePriceNow = productCompared.price_current;
    vue.productComparePriceLower = productCompared.low_price;
    vue.productCompareSave = productCompared.reduction;
    vue.productCompareRating = productCompared.rating;
    vue.productComparePriceTrend = productCompared.off;
    vue.productCompareVendor = productCompared.vendor;
    vue.productCompareCategory = productCompared.category;
    vue.productCompareLink = productCompared.link;
}
