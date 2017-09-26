describe("Shopping Cart design pattern", function () {

    // our shopping cart
    var shoppingCart = new ShoppingCart();

// creates the catalog
    shoppingCart.addItemToCatalog(new Product("B01", "RI Mug", 4.99));
    shoppingCart.addItemToCatalog(new Product("M01", "RI the book", 10));
    shoppingCart.addItemToCatalog(new Product("V01", "Video Course on retail analytics", 29.99));

// fixed shipping rates
    shoppingCart.addShippingRate(0, 10, 3.99);
    shoppingCart.addShippingRate(10, 30, 1.99);
    shoppingCart.addShippingRate(30, null, 3.99);


    // could have used an array of different offers but we'll keep it simple
    var singleBundle = new Bundle(shoppingCart.getItem("M01"), shoppingCart.getItem("V01"), 0.5);
    // for simplicity
    shoppingCart.bundle = singleBundle;

    describe("Shopping cart core methods", function () {

        var testProduct = shoppingCart.getItem("B01");

        it("should be able to find the item SKU B01 from the catalog", function () {
            expect(testProduct.sku).toEqual("B01");
        });

        it("should be able to add item M01 (book) to the shopping cart", function () {
            shoppingCart.addItemToCart('M01', 1);
            expect(shoppingCart.cart[0].sku).toEqual("M01");
            expect(shoppingCart.cart.length).toEqual(1);
        });

        it("should be able to add item V01 (book) to the shopping cart", function () {
            shoppingCart.addItemToCart('V01', 1);
            expect(shoppingCart.cart[1].sku).toEqual("V01");
            expect(shoppingCart.cart.length).toEqual(2);
        });

    });

    describe("Shopping cart checkout", function () {

        it("checkOutItems Array should contain 2 elements", function () {

            shoppingCart.checkOut();

            expect(shoppingCart.checkOutItems.length).toEqual(2);
        });

        it("On video is applied discounted price", function () {

            var discounted = new Object(shoppingCart.checkOutItems[1]);

            expect(discounted.price).toEqual(15);
        });

    })

    describe("Shopping cart totals", function () {
        it("Shipping total should be 1.99", function () {
            expect(shoppingCart.shippingCost).toEqual(1.99);

        })

    });

});

