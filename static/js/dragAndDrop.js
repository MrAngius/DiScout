// ######## DRAG AND DROP ########
function allowDrop(ev) {
    // enable the default action for drop
    ev.preventDefault();
}

function drag(ev, isFocus) {
    // used to send data
    ev.dataTransfer.setData("id", ev.target.parentNode.getAttribute("data-id"));    // product id
    ev.dataTransfer.setData("img_src", ev.target.parentNode.getAttribute("data-image"));  // product image
    ev.dataTransfer.setData("isFocus", isFocus);
}

function drop(ev) {
    ev.preventDefault();

    // get the product ID
    let data = ev.dataTransfer.getData("id");

    // get the product image
    let image = ev.dataTransfer.getData("img_src");

    // get the type of drag'n drop operation
    let type = ev.dataTransfer.getData("isFocus");


    if(type === "true") {
        // we want to update information about the main product
        setMainImageOnly(image);
        updateValuesFocus(data);
        updateGraph(data, "focus");
    } else {
        // we want to compare the main product with another one
        setOtherImage(image);
        updateValuesComparisons(data);
        updateGraph(data, "comparison");
    }

}