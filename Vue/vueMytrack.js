// LAYOUT DEFINITION
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



