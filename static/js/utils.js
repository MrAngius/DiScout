let trackedProducts = [2, 6];

function showHideSlider(graphId, productPrev) {
  if (window.innerWidth < 601) {
    Plotly.relayout(graphId, {
      'xaxis.rangeslider.visible': false,
      'showlegend': false
    })
  } else {
    Plotly.relayout(graphId, {
      'xaxis.rangeslider.visible': true,
      'showlegend': !productPrev
    })
  }
}

function addRemoveClass(targetElem, className) {
  if (targetElem.classList.contains(className)) {
    targetElem.classList.remove(className);
  }
  else {
    targetElem.classList.add(className);
  }
}


// add the product to the list of tracked ones for the user
function trackAProduct(product_id) {
  if(!trackedProducts.includes(product_id)){
    trackedProducts.push(product_id)
  }
}

function unTrackAProduct (product_id) {
  let index = trackedProducts.indexOf(product_id);
  if(index > -1){
    trackedProducts.splice(index, 1)
  }
}

// used to control if the product is in the list
function isTracked(product_id) {
  let tmp =  trackedProducts.includes(product_id);
  return tmp
}
