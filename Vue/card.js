/*
TEMPLATE FOR THE CARDS
The card itself is the "vue-card-container" element.
The "title"is on top of the card.
The "track" button is at bottom.
Other information and the product image are represented on a single row, inside the element with class "vue-card-product-info"

 */


Vue.component('card', {
    template: `
    <div class="vue-card-container">
        <div class="vue-card-product">
            <p class="title-box" v-text="title"></p>
            <div class="vue-card-product-info">
                <div class="vue-card-image-box">
                    <img v-if="img_src" class='vue-card-product-image' :src="img_src">
                    <img v-else class='vue-card-product-image' src="https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg">
                </div>
                <div class="vue-card-summary-box">
                    <div v-if="price" v-text="price + '$'"></div>
                    <div v-if="trend" v-text="trend"></div>
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
    props: {
        title: {
            type: String,
            required: true
        },
        img_src: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true,
        },
        trend: {
            type: Number,
            required: false
        }
    }
});