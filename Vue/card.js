Vue.component('card', {
    template: `
    <div class="vue-card-main-container w3-row-padding w3-margin-top">
        <div class="vue-card-top-container">
            <div class="vue-card-image-box">
                <img class='vue-card-product-image' :src="img_src">
            </div>
            <div class="vue-card-product-summary">
                <div v-if="price">
                    <span v-text="price">$</span>
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