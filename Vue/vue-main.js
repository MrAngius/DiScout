let vue;

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
                dispCat: true
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
            updateCategory: function(e){
                /* Cannot update the value in the array :( */
                /* this.categories[e.target.id]=e.target.checked */
                this.categories[e.target.id]=!this.categories[e.target.id];
            },
            showCategory: function(){
                this.filters.dispCat=!this.filters.dispCat
            }
        }
    });
    loadDB('database_production/product_db.json')
});

