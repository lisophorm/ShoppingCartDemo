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

var ShoppingCart = function () {
    this.catalog = [];
    this.cart = [];
    this.bundle={};
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
    console.log('cart content at checkout', this.cart);

    var checkOutItems = [];
    this.subTotal = 0

    for (var i = 0; i < this.cart.length; i++) {
        var current = this.cart[i];
        var quantity = this.cart[i].quantity;
        console.log('current item quantity', quantity);
        for (var a = 0; a < quantity; a++) {
            checkOutItems.push(new CheckOutUnit(current));
        }
    }

    // iterations for bundle/offer
    // we mark as processed products to avoid duplicates

    for (var i = 0; i < checkOutItems.length; i++) {
        var productA=checkOutItems[i];
        for(var a=0;a<checkOutItems.length;a++) {
            // skip if the item checks on itself
            if(i!=a) {
                var productB=checkOutItems[a];
                console.log('checking '+i+':'+productA.sku+ ' versus '+a+' '+productB.sku);
                if(this.bundle.hasOffer(productA,productB)) {
                    console.log("PRODUCT HAS OFFER!!");
                    // we mark the pair processed to avoid cumulative offers/bugs
                    productA.processed=true;
                    productB.processed=true;
                    productB.price=this.bundle.calcDiscount();
                }
            }

        }
    }

    console.log('checkout Items processed', checkOutItems);
    for (var i = 0; i < checkOutItems.length; i++) {
        this.subTotal += checkOutItems[i].price;
    }
    console.log(this.subTotal);
    this.shippingCost = this.shipping.calculate(this.subTotal);
    console.log(this.shippingCost);
    this.total=this.subTotal+this.shippingCost;
}

ShoppingCart.prototype.renderItemized=function(checkOutItems) {
    var result='';
    for (var i=0;i<checkOutItems.length;i++) {

    }
}