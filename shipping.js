var Shipping= function() {
   this.rates=[]
}

Shipping.prototype.addFixedRate=function(min,max,price) {
    var currentRate=new Object({min:min,max:max,price:price})
    this.rates.push(currentRate);
}

Shipping.prototype.calculate=function(amount) {
    var shippingCost=0;
    for (var i=0;i<this.rates.length;i++) {
        var currentRate=this.rates[i];
        if(amount>=currentRate.min && (amount <= currentRate.max || amount ==null)) {
            return currentRate.price;
        }
    }
    return shippingCost;
}