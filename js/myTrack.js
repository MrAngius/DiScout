// use the addEvent listener to wait the load of the page before use JS
window.addEventListener('load', function (ev) {

    // handle the page using vue
    new Vue({
        el: "#main-page",
        data: {
            product_focus_title: "My brand new iPhone",
            product_focus_info: "Some info of our product"
        },
        methods: {

        }



    })

});