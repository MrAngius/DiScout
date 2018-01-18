Vue.component('card', {
    template: `
    <div class="vue-card-main-container">
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
        <div class="vue-card-bottom-bar w3-hover-teal search-result">
            <div class="title-box">
                <span v-text="title"></span>
            </div>
            <button><i class="fa fa-plus"></i> Track</button>
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