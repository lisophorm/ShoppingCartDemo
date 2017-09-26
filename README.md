SHOPPING CART DEMO 

**Tested in Chrome. Download and run locally index.html and/or SpecRunner.html**

In order to deliver this test ASAP I used the skeleton of a previous exercise.

**Ordinarily i would use NPM - Wepback and ES6**. Here I used plain javascript, yet this is a "pure" Object Oriented design that can be easily transpiled in ES6.

The ShoppingCart structure shows quite well my style of abstraction and overall design.

**index.js** -> load product and bootstraps the demo it just a quick hack to get a proof of concept.

The shopping cart is split in logical modules (Objects):

**shipping.js** -> calculates fixed shipping based on defined price ranges

**bundle.js ->** simple product discount processor where if(product A) then productB.price*discount

**cart.js ->** all the shopping cart logic. Embedding the bundle and the shipping objects. The discount mechanism is quite torough and prevents from cumulative discounts.

**SpecRunner.html** performs only few rustic conditions. Without time constraints I would have a mild TDD approach.

Please follow comments in the code.

To test into a browser just download and launch the index.html

