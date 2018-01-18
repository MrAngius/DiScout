Vue.component('product-list', {
    template: `
    <div id="app">
        <div v-for="card in cards">
          <card :title="card.title" :price="card.price" :img_src="card.img_src"></card>
        </div>
    </div>
    `,
    name: 'App',
    methods: {
        addProduct: function (title, price) {
            this.cards.push({
                    title: title,
                    price: price
                }
            )
        }
    },
    data() {
        return {
            cards: [
                {
                    title: 'Product 1',
                    price: 14,
                    img_src: "img/search_result.jpg"
                },
                {
                    title: 'Product 2',
                    price: 34,
                    img_src: "img/search_result.jpg"
                },
                {
                    title: 'Product 3',
                    price: 65,
                    img_src: "img/search_result.jpg"
                },
                {
                    title: 'Product 4',
                    price: 12,
                    img_src: "img/search_result.jpg"
                }
            ]
        }
    }
});