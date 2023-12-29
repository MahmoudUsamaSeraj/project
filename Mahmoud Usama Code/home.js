
function slider(){
    var counter = 1;
setInterval(function(){
    document.getElementById("radio"+ counter).checked=true;
    counter++;
    if(counter>5){
        counter = 1;
    }
}, 4000)
}
var iconCart = document.querySelector('.icon-cart');
var closeCart = document.querySelector('.close');
var body = document.querySelector('body');
var listProductHTML = document.querySelector('.listProduct');
var listCartHTML = document.querySelector('.listCart');
var iconCartSpan = document.querySelector('.icon-cart span');
var listProducts = [];
var jsonArray;
fetch('product.json')
  .then(response => response.json())
  .then(data => {
     jsonArray = Array.isArray(data) ? data : data.products;
  })
var cart =[];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

var addDataToHTML = () => {
    listProductHTML.innerHTML='';
        if(listProducts.length > 0) 
        {
            listProducts.forEach(product => {
                var newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `  <img src="${product.image}" alt="">
                <span>Adidas</span>
                <h5 class="des">${product.name}</h5>
                    <h4 class="des">${product.price}L.E</h4>
                    <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }

    function filterByCat(category){
        var listProducts = jsonArray.filter(product =>  product.name == category );
        listProductHTML.innerHTML='';
        if(listProducts.length > 0) 
        {
            listProducts.forEach(product => {
                var newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `  <img src="${product.image}" alt="">
                <span>Adidas</span>
                <h5 class="des">${product.name}</h5>
                    <h4 class="des">${product.price}L.E</h4>
                    <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        var positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            var id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    });
    var addToCart = (product_id) => {
        var positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                quantity: 1
            }];
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity += 1;
        }
        addCartToHTML();
        addCartToMemory();
    }
    var addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    var addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        var totalQuantity = 0;
        if(cart.length > 0){
            cart.forEach(cart => {
                totalQuantity += cart.quantity;
                var newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.dataset.id = cart.product_id;
    
                var positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
                var info = listProducts[positionProduct];
                listCartHTML.appendChild(newCart);
                newCart.innerHTML = `
                <div class="image">
                        <img src="${info.image}" alt="">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">${info.price * cart.quantity}L.E</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
            })
        }
        iconCartSpan.innerText = totalQuantity;
    }

    listCartHTML.addEventListener('click', (event) => {
        var positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
            var product_id = positionClick.parentElement.parentElement.dataset.id;
            var type = 'minus';
            if(positionClick.classList.contains('plus')){
                type = 'plus';
            }
            changeQuantityCart(product_id, type);
        }
    })
    var changeQuantityCart = (product_id, type) => {
        var positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
        if(positionItemInCart >= 0){
            var info = cart[positionItemInCart];
            switch (type) {
                case 'plus':
                    cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                    break;
            
                default:
                    var changeQuantity = cart[positionItemInCart].quantity - 1;
                    if (changeQuantity > 0) {
                        cart[positionItemInCart].quantity = changeQuantity;
                    }else{
                        cart.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToHTML();
        addCartToMemory();
    }

var initApp = () => {
    fetch('product.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

      
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();

function slider(){
    var counter = 1;
setInterval(function(){
    document.getElementById("radio"+ counter).checked=true;
    counter++;
    if(counter>5){
        counter = 1;
    }
}, 4000)
}
slider();

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  window.onscroll = function() {
    var scrollToTopLink = document.getElementById('scrollToTopLink');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopLink.style.display = 'block';
    } else {
      scrollToTopLink.style.display = 'none';
    }
  };


