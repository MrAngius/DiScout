// LOYOUT DEFINITION
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
    },
    autosize: true
};
let vue;

window.addEventListener('load', function () {

    vue = new Vue({
        el: '#vue',
        data: {
            filters: {
                categories:[
                    {
                        id: 'Accessories',
                        name: 'Accessories'
                    },
                    {
                        id: 'Bags',
                        name: 'Bags'
                    },
                    {
                        id: 'BooksandMusic',
                        name: 'Books and Music'
                    },
                    {
                        id: 'Hitech',
                        name: 'Hi-tech'
                    },
                    {
                        id: 'Home',
                        name: 'Home'
                    },
                    {
                        id: 'Shoes',
                        name: 'Shoes'
                    },
                    {
                        id: 'Sports',
                        name: 'Sports'
                    },
                    {
                        id: 'Tools',
                        name: 'Tools'
                    },
                    {
                        id: 'Toys',
                        name: 'Toys'
                    },
                    {
                        id: 'Vetements',
                        name: 'Vetements'
                    }
                ],
                price: {
                    min: 0,
                    max: 1000
                },
                rating: {
                    min: 0,
                    max: 5
                },
                dispCat: true
            },
            cards: {

            },

            // table
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

            /*
             * Dynamically loaded element will make the filter not work (WTF?!)
             * Working on it..
             */
            categories: {
                Accessories: true,
                Bags: true,
                BooksandMusic: true,
                Hitech: true,
                Home: true,
                Shoes: true,
                Sports: true,
                Tools: true,
                Toys: true,
                Vetements: true
            },
            show: true,
        },
        methods: {
            resetFilters: function(){
                for(let i=0; i<this.filters.length; i++){
                    this.categories[this.filters[i].id]=true;
                }
            },
            showOrCat: function(cat){
                return this.show && this.categories[cat.replace(/[^A-Za-z0-9]/gi, '')]
            },
            updateCategory: function(e){
                /* Cannot update the value in the array :( */
                /* this.categories[e.target.id]=e.target.checked */
                this.categories[e.target.id]=!this.categories[e.target.id];
            },
            showCategory: function(){
                this.filters.dispCat=!this.filters.dispCat
            },
            showRange: function (value, event) {
                setHistory(value)
            }
        }
    });

    // graph
    graph = document.getElementById("graph");
    Plotly.newPlot(graph, [], LAYOUT, {displayModeBar: false});


    loadDB('database_production/product_db.json')
});


window.onresize = function() {
    Plotly.Plots.resize(graph);
};
