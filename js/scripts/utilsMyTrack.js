// ########### ONCLICK ##############
function clickProduct(elem, isFocus){

    // get the product image
    let image = elem.parentNode.parentNode.getAttribute("data-image");
    console.log(image);

    // get the data product data-id
    let data = elem.parentNode.parentNode.getAttribute("data-id");
    console.log(data);

    if(isFocus === "true") {
        setMainImageOnly(image);
        updateValuesFocus(data);
        updateGraph(data, "focus");

    } else {
        setOtherImage(image);
        updateValuesComparisons(data);
        updateGraph(data, "comparison");
    }
}


// TODO: I would like to define "productImageContainer" as a global constant... but this script is loaded before the DOM elements!
// ########## TRIANGLE IMAGE #########
// use this function to set the top-left product image
function setMainImage(src) {
    const productImageContainer = document.getElementById('triangles-container');
    productImageContainer.firstChild.style.visibility = 'visible';
    productImageContainer.firstChild.firstChild.src = src;
}

// use this function to set the bottom-right product image
function setOtherImage(src) {
    const productImageContainer = document.getElementById('triangles-container');
    productImageContainer.firstChild.classList.add('triangle');
    productImageContainer.lastChild.style.visibility = 'visible';
    productImageContainer.lastChild.firstChild.src = src;
}

// use this image to set an image only (without triangles)
function setMainImageOnly(src) {
    setMainImage(src);
    const productImageContainer = document.getElementById('triangles-container');
    productImageContainer.firstChild.classList.remove('triangle');
    productImageContainer.lastChild.style.visibility = 'hidden';
}