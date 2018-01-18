Vue.component('product-list', {
    template: `
    <!-- TODO: verify the utility of the app id -->
    <div id="app" >
      <div v-for="card in cards">
        <card :id="card.id" :title="card.name" :price="card.price" :img_src="card.img_source"></card>
      </div>
    </div>

    `,
    name: 'App',
    // NOTE: this function is used to add additional data
    methods: {
        addProduct: function (id, name, price, rating, trend, vendor, low_price, link, img_source) {
            var p={
                id: id,
                name: name,
                price: price,
                rating: rating,
                trend: trend,
                vendor: vendor,
                low_price: low_price,
                link: link,
                img_sorce: img_source
            }
            this.cards.push(p)
        }
    },
    data() {
        return {
            // NOTE: default data which is added on load
            cards: [
            ]
        }
    }
});


function loadDB(database){
    //alert("Loading DB")
    Plotly.d3.json(database, function(e,data){
        vue_one.$refs.ref_product_list.cards = data.products
    })
}