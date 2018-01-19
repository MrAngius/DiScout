let vue
window.addEventListener('load', function () {
    vue=new Vue({
        el: '#vue',
        data: {
            filters: [
                {
                    id: 'Accessories',
                    name: 'Accessories'
                },
                {
                    id: 'Bags',
                    name: 'Bags'
                },
                {
                    id: 'Books_and_Music',
                    name: 'Books and Music'
                },
                {
                    id: 'Hi_tech',
                    name: 'Hi tech'
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
            cards: [
            ],

            /*
             * Dynamically loaded element will make the filter not work (WTF?!)
             * Working on it..
             */
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
        methods: {
            updateCategory(e){
                /* Cannot update the value in the array :( */
                /* this.categories[e.target.id]=e.target.checked */
                this.categories[e.target.id]=e.target.checked;
            }
        }
    });
    loadDB('database.json')
});



function loadDB(database){
    //alert("Loading DB")
    Plotly.d3.json(database, function(e,data) {
        vue.cards = data.products
        /* Following code is used to insert categories dynamically, not working atm */
        /*
        for (var i = 0; i < data.products.length; i++) {
            var cat = data.products[i].category
            vue.categories[cat] = true
        }
        */

    })
}