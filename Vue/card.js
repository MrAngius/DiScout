/*
TEMPLATE FOR THE CARDS
The card itself is the "vue-card-main-container" element.
According to the screen size, the "title" can be on top or on the bottom of the card.
The "track" button is always at bottom.
Other information and the product image are represented on a single row, inside the element with class "vue-card-top-container"

 */


Vue.component('card', {
    template: `
    <div class="vue-card-main-container">
        <p class="title-box w3-hide-medium w3-hide-large" v-text="title"></p>
        <div class="vue-card-top-container">
            <div class="vue-card-image-box">
                <img v-if="img_src" class='vue-card-product-image' :src="img_src">
                <img v-else class='vue-card-product-image' src="https://image.freepik.com/free-photo/dollar-sign-symbol_2227-466.jpg">
            </div>
            <div class="vue-card-product-summary">
                <div v-if="price">
                    <span v-text="price + '$'"></span>
                </div>
                <div v-if="trend">
                    <span v-text="trend"></span>
                </div>
            </div>
        </div>
        <p class="title-box w3-hide-small">
            <span v-text="title"></span>
            <button><i class="fa fa-plus"></i> Track</button>
        </p>
        <button class="w3-mobile w3-hide-medium w3-hide-large">
            <i class="fa fa-plus"></i> Track
        </button>
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