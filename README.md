SHOPPING CART DEMO

This hopes to be a demo of the way I approach problems. In no way I would use this simple approach on a commercial project.

The shopping cart is split in logical modules (Objects):

shipping.js -> calculates fixed shipping based on defined price ranges
bundle.js -> simple product discount processor where if(product A) then productB.price*discount
cart.js -> all the shopping cart logic. Embedding the bundle and the shipping objects.

index.js -> load product and bootstraps the demo

Please follow comments in the code.

