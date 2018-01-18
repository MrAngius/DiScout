Vue.component('product-list', {
    template: `
    <!-- TODO: verify the utility of the app id -->
    <div id="app" >
      <div v-for="card in cards">
        <card :id="card.id" :title="card.title" :price="card.price" :img_src="card.img_src"></card>
      </div>
    </div>

    `,
    name: 'App',
    // NOTE: this function is used to add additional data
    methods: {
        addProduct: function (id, title, price, rating, trend, vendor, low_price, link, img_src) {
            var p={
                id: id,
                title: title,
                price: price,
                rating: rating,
                trend: trend,
                vendor: vendor,
                low_price: low_price,
                link: link,
                img_src: img_src
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