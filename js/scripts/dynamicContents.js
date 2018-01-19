/* Create contents dinamically */

function productPreview(productElem, modalContainerId) {
    // show the modal window
    showHideTarget(modalContainerId);
    // set its content
    const modalContent = document.getElementById('zoomed-product');
    // TODO: create the trend graph, according to the Vue component written by Marco
    modalContent.innerHTML = 'Product ID = ' + productElem.getAttribute('id');
}
