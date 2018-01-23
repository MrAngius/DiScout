
function loadDB(database){
  if (window.sessionStorage.getItem(database) === null) {
    alert('DB not loaded')
    Plotly.d3.json('static/database_production/' + database + '.json', function (e, data) {
      window.sessionStorage.setItem(database, JSON.stringify(data.products))
      return data.products
    })
  }
  else {
    alert('DB loaded')
    return JSON.parse(window.sessionStorage.getItem(database))
  }

  /* Following code is used to insert categories dynamically, not working atm */
  /*
  for (var i = 0; i < data.products.length; i++) {
      var cat = data.products[i].category
      vue.categories[cat] = true
  }
  */
}

function showHideSlider(graphId, productPrev) {
  if (window.innerWidth < 601){
    Plotly.relayout(graphId, {
      'xaxis.rangeslider.visible': false,
      'showlegend': false
    })
  }else {
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
