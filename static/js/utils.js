function loadDB(database){
    alert("Loading DB");
    if(window.sessionStorage.getItem('database')===null) {
        alert("Not found");
        Plotly.d3.json(database, function (e, data) {

            vue.cards = data.products;
            window.sessionStorage.setItem('database', JSON.stringify(data.products))
        })
    }
    else {
        alert("Found");
        vue.cards = JSON.parse(window.sessionStorage.getItem('database'))
    }

    /* Following code is used to insert categories dynamically, not working atm */
    /*
    for (var i = 0; i < data.products.length; i++) {
        var cat = data.products[i].category
        vue.categories[cat] = true
    }
    */
}