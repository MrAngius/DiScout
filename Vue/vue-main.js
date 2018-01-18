let vue_one
window.addEventListener('load', function () {
    vue_one = new Vue({
        el: '#product-list',
    });
    loadDB('database.json')
});

function loadDB(database){
    //alert("Loading DB")
    Plotly.d3.json(database, function(e,data){
        for(var i=0; i<data.products.length; i++) {
            p=data.products[i]
            vue_one.$refs.ref_product_list.addProduct(parseInt(p.id), p.name, parseFloat(p.price), parseFloat(p.rating), parseFloat(p.trend), p.vendor, parseFloat(p.low_price), p.link, p.img_source);
        }
    })
}