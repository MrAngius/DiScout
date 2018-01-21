
// TODO: need to make the function read the id of the object and retrieve the info
// ####### UPDATES #######

function updateValuesFocus(data) {
    vue.isNotVisible = true;
    let productFocused = vue.cards[data];

    vue.productFocusTitle = productFocused.name;
    //vue.$data.productFocusDescription = productFocused.description;
    vue.productFocusPrice = productFocused.price;
    vue.productFocusPriceNow = productFocused.price_current;
    vue.productFocusPriceLower = productFocused.low_price;
    vue.productFocusSave = productFocused.reduction;
    vue.productFocusRating = productFocused.rating;
    vue.productFocusPriceTrend = productFocused.off;
    vue.productFocusVendor = productFocused.vendor;
    vue.productFocusCategory = productFocused.category;
    vue.productFocusLink = productFocused.link;

}

function updateValuesComparisons(data) {
    vue.isNotVisible = false;
    let productCompared = vue.cards[data];

    vue.productCompareTitle = productCompared.name;
    //vue.$data.productCompareDescription = productCompared.description;
    vue.productComparePrice = productCompared.price;
    vue.productComparePriceNow = productCompared.price_current;
    vue.productComparePriceLower = productCompared.low_price;
    vue.productCompareSave = productCompared.reduction;
    vue.productCompareRating = productCompared.rating;
    vue.productComparePriceTrend = productCompared.off;
    vue.productCompareVendor = productCompared.vendor;
    vue.productCompareCategory = productCompared.category;
    vue.productCompareLink = productCompared.link;
}
