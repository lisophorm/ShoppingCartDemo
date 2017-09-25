var Bundle = function (productA, productB, discount) {
    this.productA = productA;
    this.productB = productB;
    this.discount = discount;
}


Bundle.prototype.hasOffer = function (productA, productB) {

    if (productA.sku === this.productA.sku && productB.sku === this.productB.sku && !productA.processed && !productB.processed) {
        return true
    } else {
        return false;
    }
}

Bundle.prototype.calcDiscount = function () {
    console.log('calculating discount');
    var discount = this.productB.price * this.discount;
    console.log('discouinted price:', discount)
    return discount;
}