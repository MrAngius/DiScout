/*
TEMPLATE FOR THE CARDS
The card itself is the "vue-card-container" element.
The "title"is on top of the card.
The "track" button is at bottom.
Other information and the product image are represented on a single row, inside the element with class "vue-card-product-info"

*/

Vue.component('card', {
    template: `
    <div :id="id" class="vue-card-container">
        <div class="vue-card-product">
            <div :onclick="onclick_callback">
                <p class="title-box" v-text="name"></p>
                <div class="vue-card-product-info">
                    <div class="vue-card-image-box">
                        <img v-if="img_source" class='vue-card-product-image' :src="img_source">
                        <img v-else class='vue-card-product-image' src="https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg">
                    </div>
                    <div class="vue-card-summary-box">
                        <!-- Add here other product useful information... -->
                        <div v-if="price_current" v-text="price_current + '€'"></div>
                        <div v-if="off" v-text="off"></div>
                    </div>
                </div>
            </div>
            <div class="vue-card-track">
                <i class="fa fa-plus"></i> Track
            </div>
        </div>
    </div>
    `,
    name: "card",
    data() {
        return {}
    },
    // name;price_current;price;reduction;rating;
    // low_price;off;img_source;vendor;category;link

    // NOTE: possible to review these fields
    // those fields can be be filled when declaring the card template
    props: {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        vendor: {
            type: String,
            required: false
        },
        img_source: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: false
        },
        price_current: {
            type: String,
            required: false,
        },
        price: {
            type: String,
            required: false
        },
        off: {
            type: String,
            required: false
        },
        rating: {
            type: String,
            required: false
        },
        id_similar_p: {
            type: Array,
            required: false
        },
        low_price: {
            type: String,
            required: false
        },
        onclick_callback: {
            type: String,
            required: true
        }
    }
});