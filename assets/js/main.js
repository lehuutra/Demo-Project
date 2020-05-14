if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('home-product__btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('home-product__title')[0].innerText
    var price = shopItem.getElementsByClassName('home-product__price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-top-img')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('home-product-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('đ', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + 'đ';
}

var hiddenBox = $( ".Cart-viewbox" );
$( ".header__cart-icon" ).on( "click", function( event ) {
hiddenBox.show();
});
$( ".Cart-viewbox-btn" ).on( "click", function( event ) {
hiddenBox.hide();
});

$(function(){
    $(".topbar ul li").click(function(){
        $(".topbar ul li").not(this).find("ul").slideUp();
        $(this).find("ul").slideToggle();
    });
    $(".topbar ul li ul li, grid__column-2 ul li .megamenu").click(function(e){
        e.stopPropagation();	
    });
    $(".grid__column-2 ul li").click(function(){
        $(".grid__column-2 ul li").not(this).find(".megamenu").hide();
        $(this).find(".megamenu").toggle();
    });

    $(".fa-eye").click(function(e){
        e.preventDefault();
        $("body").css("overflow", "hidden");
        $(".product-detail").slideDown();
    });
    $(".close-viewbox").click(function(){
        $("body").css("overflow", "visible");
        $(".product-detail").slideUp();
    });
});

// Hiện form đăng ký

var hiddenForm = $( ".modal-sign" );
$( ".header__sign" ).on( "click", function( event ) {
hiddenForm.show();
});
$( ".auth-form__controls-back" ).on( "click", function( event ) {
hiddenForm.hide();
});

// Hiện form đăng nhập

// var hiddenForm = $( ".modal-login" );
// $( ".header__login" ).on( "click", function( event ) {
// hiddenForm.show();
// });
// $( ".auth-form__controls-back" ).on( "click", function( event ) {
// hiddenForm.hide();
// });


// Search

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementsByClassName("header__search-input");
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("grid__row");
    li = ul.getElementsByClassName("grid__column-2-4");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("home-product__title")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}