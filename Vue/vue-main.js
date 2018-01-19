let vue
window.addEventListener('load', function () {
    vue=new Vue({
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
                dispCat: false
            },
            cards: {

            },

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
            updateCategory(e){
                /* Cannot update the value in the array :( */
                /* this.categories[e.target.id]=e.target.checked */
                this.categories[e.target.id]=!this.categories[e.target.id];
            },
            showCategory: function(){
                this.filters.dispCat=!this.filters.dispCat
            }
        }


    });
    loadDB('database.json')
});



function loadDB(database){
    //alert("Loading DB")
    if(window.sessionStorage.getItem('database')==undefined) {
        Plotly.d3.json(database, function (e, data) {
            vue.cards = data.products
            /* Following code is used to insert categories dynamically, not working atm */
            /*
            for (var i = 0; i < data.products.length; i++) {
                var cat = data.products[i].category
                vue.categories[cat] = true
            }
            */
            console.log(JSON.stringify(data.products))
            window.sessionStorage.setItem('database', JSON.stringify(data.products))
        })
    }
    else {
        vue.cards = JSON.parse(window.sessionStorage.getItem('database'))

    }
}