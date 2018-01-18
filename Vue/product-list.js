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
        addProduct: function (id, title, price) {
            this.cards.push({
                    id: id,
                    title: title,
                    price: price
                }
            )
        }
    },
    data() {
        return {
            // NOTE: default data which is added on load
            cards: [
                {
                    id: 1,
                    title: 'Product 1',
                    price: 14,
                    img_src: "img/search_result.jpg"
                },
                {
                    id: 2,
                    title: 'Product 2',
                    price: 34,
                    img_src: "img/search_result.jpg"
                },
                {
                    id: 3,
                    title: 'Product 3',
                    price: 65,
                    img_src: "img/search_result.jpg"
                },
                {
                    id: 4,
                    title: 'Product 4',
                    price: 12,
                    img_src: "img/search_result.jpg"
                }
            ]
        }
    }
});