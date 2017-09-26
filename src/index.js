// our shopping cart
var shoppingCart=new ShoppingCart();

// creates the catalog
shoppingCart.addItemToCatalog(new Product("B01","RI Mug",4.99));
shoppingCart.addItemToCatalog(new Product("M01","RI the book",10));
shoppingCart.addItemToCatalog(new Product("V01","Video Course on retail analytics",29.99));

// fixed shipping rates
shoppingCart.addShippingRate(0,10,3.99);
shoppingCart.addShippingRate(10,30,1.99);
shoppingCart.addShippingRate(30,null,3.99);


// could have used an array of different offers but we'll keep it simple
var singleBundle=new Bundle(shoppingCart.getItem("M01"),shoppingCart.getItem("V01"),0.5);
// for simplicity
shoppingCart.bundle=singleBundle;

// please forgive me for this sin
function renderResult() {
    $("#output").html(shoppingCart.renderItemized());
}

$(document).ready(function() {
    console.log('document ready');
    $("#addB01").click(function(e) {
        e.preventDefault();
        console.log('ADD B01');
        shoppingCart.addItemToCart('B01',1);
        shoppingCart.checkOut();
        renderResult();
    });
    $("#addM01").click(function() {
        console.log('ADD M01');

        shoppingCart.addItemToCart('M01',1);
        shoppingCart.checkOut();
        renderResult();
    });
    $("#addV01").click(function() {
        shoppingCart.addItemToCart('V01',1);
        shoppingCart.checkOut();
        renderResult();
    });
})