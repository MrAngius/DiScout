window.addEventListener('load', function () {
    let vue_one = new Vue({
        el: '#product-list',
    });


    /* This is to test the possibility of changing dynamically the content of the list
     * The following code will be removed
     */
        function addSomeProducts(){
            for(var i=1; i<10; i++) {
                vue_one.$refs.ref_product_list.addProduct("Dynamic Product " + i, i*10)
            }
        }
        window.setTimeout(addSomeProducts, 100)
    /*
     */
});