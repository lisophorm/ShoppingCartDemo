// single product for the catalog
var Product = function (sku, desc, price) {
    this.sku = sku;
    this.desc = desc;
    this.price = price;
}

// product item to be used in the cart
var CartItem = function (product, quantity) {
    this.sku = product.sku;
    this.desc = product.desc;
    this.price = product.price;
    this.quantity = quantity;
}

// item used for the checkout calculations
var CheckOutUnit = function (cartItem) {
    this.processed = false;
    this.sku = cartItem.sku;
    this.price = cartItem.price;
}

CheckOutUnit.prototype.toString=function() {
    return  '<td>' +this.sku+'</td><td align="center">' +this.price+'</td><td align="center">' +this.processed+'</td>';
}

var ShoppingCart = function () {
    this.catalog = [];
    this.cart = [];
    this.bundle = {};
    this.checkOutItems = [];
    this.shipping = new Shipping();
    this.subTotal = 0;
    this.shippingCost = 0;
    this.total = 0;
}

ShoppingCart.prototype.addShippingRate = function (min, max, price) {
    this.shipping.addFixedRate(min, max, price);
}

ShoppingCart.prototype.addItemToCatalog = function (product) {
    this.catalog.push(product);
}

ShoppingCart.prototype.getItem = function (sku) {
    for (var i in this.catalog) {
        if (this.catalog[i].sku === sku) {
            console.log('found item ', this.catalog[i]);
            return this.catalog[i];
            break;
        }
    }
    return false;
}

ShoppingCart.prototype.addItemToCart = function (sku, quantity) {

    console.log("addItemToCart:", sku);

    var cartItem = new CartItem(this.getItem(sku), quantity);

    for (var i in this.cart) {
        if (this.cart[i].sku === cartItem.sku) {
            this.cart[i].quantity += quantity;
            this.saveCart();
            return;
        }
    }

    var item = new CartItem(this.getItem(sku), quantity);
    this.cart.push(item);
    this.saveCart();
};

ShoppingCart.prototype.saveCart = function () {
    console.log('save cart', this.cart);
}

ShoppingCart.prototype.checkOut = function () {


    this.checkOutItems = [];
    this.subTotal = 0;

    // explodes the cart in single item products. this is to calculate more easily discounts

    for (var i = 0; i < this.cart.length; i++) {
        var current = this.cart[i];
        var quantity = this.cart[i].quantity;
        // adds multiple items of the same product according to quantity
        for (var a = 0; a < quantity; a++) {
            this.checkOutItems.push(new CheckOutUnit(current));
        }
    }

    // iterations for bundle/offer
    // we mark as processed products to avoid duplicates

    for (var i = 0; i < this.checkOutItems.length; i++) {
        var productA = this.checkOutItems[i];
        for (var a = 0; a < this.checkOutItems.length; a++) {
            // skip if the item checks on itself
            if (i != a) {
                var productB = this.checkOutItems[a];
                console.log('checking ' + i + ':' + productA.sku + ' versus ' + a + ' ' + productB.sku);
                if (this.bundle.hasOffer(productA, productB)) {
                    // we mark the pair processed to avoid cumulative offers/bugs
                    productA.processed = true;
                    productB.processed = true;
                    productB.price = this.bundle.calcDiscount();
                }
            }

        }
    }

    console.log('checkout Items processed', this.checkOutItems);
    for (var i = 0; i < this.checkOutItems.length; i++) {
        this.subTotal += this.checkOutItems[i].price;
    }
    // round up to avoid odd decimals
    this.subTotal=Math.round(this.subTotal*100)/100
    console.log(this.subTotal);
    this.shippingCost = this.shipping.calculate(this.subTotal);
    console.log(this.shippingCost);
    // round up to avoid odd decimals
    this.total = Math.round((this.subTotal + this.shippingCost)*100)/100;
}

ShoppingCart.prototype.renderItemized = function () {
    var result = '';
    var result ='Subtotal: <strong>'+this.subTotal+'</strong> shipping:  <strong>'+this.shippingCost+'</strong> total  <strong>'+this.total+'</strong><br/>';
    result +='<br/><hr/>';
    result +='<table border="1" cellpadding="8">'
    result +='<tr><td>SKU</td><td>Final Price</td><td>Processed for discount?</td></tr>'
    for (var i = 0; i < this.checkOutItems.length; i++) {
        var current=this.checkOutItems[i];
        result += '<tr>'+current.toString() + '</tr>';
    }
    result +='</table>'
    return result;
}