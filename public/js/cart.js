var cart = []

function addToCart(object) {
    cart.push(object);
}

function removeFromCart(index) {
    cart.splice(index);
}

function getNumberOfItems() {
    return cart.length;
}