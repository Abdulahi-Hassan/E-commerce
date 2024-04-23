const navbar = document.querySelector('.navbar');
const IconMenu = document.querySelector('.menu');
const Remove = document.querySelector('.bars');
const cart = document.querySelector('.cart-items');
const cartcount = document.querySelector('.cart-count');
const Total = document.querySelector('.total');
let CartItems = []
const ProductBtn = document.querySelectorAll('.Product-btn')
IconMenu.addEventListener('click', () => {
    navbar.classList.toggle('open')
})
const Cartcounter = document.querySelector('.cart-counter');
Cartcounter.addEventListener('click', () => {
    cart.classList.add('open')
})
Remove.addEventListener('click', () => {
    cart.classList.remove('open')
})
const AddProduct = (Products) => {
    const { id, name, image, price, quantity } = Products;
    cart.insertAdjacentHTML("afterbegin", `
    <div class="cart-item">
    <input type="hidden" id="id" value=${id}>
    <img class="cart-image" src=${image} width="300" alt="">
    <div class="cart-title">
     <h1 class="cart-name">${name}</h1>
     <a href='#'> 
      <button class="cart-btn decrease" action="decrease">-</button>
       </a>
      <h1 class="cart-quantity">${quantity}</h1>
      <a href='#'> 
      <button class="cart-btn increase" action="increase">+</button>
       </a>
      <h1 class="cart-price">$${price}</h1>
      <a href='#'> 
      <button class="cart-btn remove" action="remove">X</button>
       </a>
    </div>
  </div>
    
    
    
    
    `)
}


ProductBtn.forEach((AllProducts) => {
    AllProducts.addEventListener('click', () => {
        const ParentElement = AllProducts.parentElement;
        let Product = {
            id: ParentElement.querySelector('#id').value,
            name: ParentElement.querySelector('.Product-name').innerText,
            image: ParentElement.querySelector('.Product-image').getAttribute('src'),
            price: ParentElement.querySelector('.Product-price').innerText.replace('$', ''),
            quantity: 1
        }

        localStorage.setItem('Products', JSON.stringify(CartItems))
        CartItems.push(Product)
        let isCart = CartItems.filter(data => data.id === Product.id).length > 0;
        console.log(isCart)
        if (isCart) {
            AddProduct(Product)
            ChectTotal();
           

        } else {
            alert("Product is Already Exist !")
            
        }

        RemoveCart(Product)
        Increase(Product, CartItems)
        Decrease(Product, CartItems)
    })
})


const ChectTotal = () => {
    let total = 0;
    CartItems.forEach((item) => {
        total += item.price * item.quantity;
    })
    cartcount.innerText = CartItems.length
    Total.innerText = total
}



const Increase = (Products, Individual) => {
    let s = document.querySelectorAll('.cart-item');
    s.forEach((item) => {
        item.querySelector("[action='increase']").addEventListener('click', (e) => {
            e.preventDefault()
            Individual.forEach((data) => {
                if (Products.id === data.id) {
                    item.querySelector('.cart-quantity').innerHTML = ++data.quantity
                }
            })
            ChectTotal()
        })

    })

}

const Decrease = (Products, Individual) => {
    document.querySelector('.cart-item').querySelector("[action='decrease']").addEventListener('click', (e) => {
        e.preventDefault()
        Individual.forEach((item) => {
            if (Products.id === item.id) {
                if (item.quantity > 1) {
                    document.querySelector(".cart-quantity").innerText = --item.quantity;
                } 
            }
            ChectTotal()
        })
    });
}
const RemoveCart = (Products) => {
    document.querySelector('.cart-item').querySelector("[action='remove']").addEventListener('click', (e) => {
        e.preventDefault()
        ChectTotal()
    });

}