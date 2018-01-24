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
