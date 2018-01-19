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
            cards: {

            }
            ,

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

        computed: {

        },

        methods: {
            resetFilters: function(){
                for(var i=0; i<this.filters.length; i++){
                    var element=document.getElementById(this.filters[i].id).checked=true;
                    this.categories[this.filters[i].id]=true;
                }
            },
            showOrCat: function(cat){
                return this.show && this.categories[cat.replace(/[^A-Za-z0-9]/gi, '')]
            },
            updateCategory(e){

                console.log(e.target.id)
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
    if(window.sessionStorage.getItem('database')==undefined) {
        alert("Not found")
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
        alert("Found")
        vue.cards = JSON.parse(window.sessionStorage.getItem('database'))

    }
}