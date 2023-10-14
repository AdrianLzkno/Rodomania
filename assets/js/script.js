if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartMessage = document.getElementById("cart-message");
    if (cartBoxes.length == 0) {
        cartMessage.innerText = "El carrito está vacío.";
    } else {
        cartMessage.innerText = ""; 
    }
}

function removeCartItem(event){
    var buttonClicked = event.target;
    var cartItem = buttonClicked.closest('.cart-box');
    cartItem.remove();
    updatetotal();

    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartMessage = document.getElementById("cart-message");
    if (cartBoxes.length == 0) {
        cartMessage.innerText = "El carrito está vacío.";
    } else {
        cartMessage.innerText = ""; 
    }
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }  
    updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    addProductToCart(title, price);
    updatetotal();
}

function addProductToCart(title, price){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title){
            alert("Ya añadiste este producto al carrito");
            return;
        } 
    }

    var cartBoxContent = `          
    <div class="d-grid detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" class="cart-quantity" value="1">
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-trash cart-remove" style="color: #FF1919;">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
    </svg>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    var cartMessage = document.getElementById("cart-message");
    if (cartMessage.innerText == "El carrito está vacío.") {
        cartMessage.innerText = "";
    }
}

function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    var text = 'Buenas, quisiera realizar este pedido:\n\n';
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace(/[^0-9]/g, ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
        text += `${titleElement.innerText} (Gs. ${price.toLocaleString()} x ${quantity})\n`;
    }

    document.getElementsByClassName("total-price")[0].innerText = "Gs. " + total.toLocaleString();

    return text + `\nTotal: Gs. ${total.toLocaleString()}`;
}

document.getElementById('realizar-pedido').addEventListener('click', function(){
    var text = updatetotal();
    window.open('https://wa.me/595986463132?text=' + encodeURIComponent(text));
});
