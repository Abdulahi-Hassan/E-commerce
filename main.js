const navbar = document.querySelector('.navbar');
const IconMenu = document.querySelector('.menu');
const Remove = document.querySelector('.remove');
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
    <div class="cart-item" >
    <input type="hidden" id="id" value=${id}>
    <img class="cart-image" src=${image} width="300" alt="">
    <div class="cart-title" >
     <h1 class="cart-name">${name}</h1>
      <button class="cart-btn decrease" action="decrease">-</button>
      <h1 class="cart-quantity">${quantity}</h1>
      <button class="cart-btn increase" action="increase">+</button>
      <h1 class="cart-price">$${price}</h1>
      <button class="cart-btn remove" action="remove">x</button>
    </div>
  </div> `)
}
const ChectTotal = () => {
    let total = 0;
    CartItems.forEach((item) => {
        total += item.price * item.quantity;
    })
    cartcount.innerText = CartItems.length
    Total.innerText = total
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
        const isCart = CartItems.filter(item => item.id === Product.id).length > 0
        if (!isCart) {
            CartItems.push(Product)
            ChectTotal()
            AddProduct(Product)
        } else {
            alert("Product is Already Exist")


        }


        SingleCartItem(Product)
    })
})
const SingleCartItem = (Product) => {
    let CartItem = document.querySelectorAll('.cart-item')
    CartItem.forEach((individual) => {
        if (individual.querySelector('#id').value === Product.id) {
            Increase(individual, Product);
            Decrease(individual, Product);
            RemoveITem(individual, Product);
        }


    })
}
const Increase = (individual, Product) => {
    individual.querySelector('.increase').addEventListener('click', () => {
        CartItems.forEach((item) => {
            if (item.id === Product.id) {
                individual.querySelector('.cart-quantity').innerText = ++item.quantity
            }
        })
        ChectTotal()

    })
}
const RemoveITem = (individual, Product) => {
    individual.querySelector('.remove').addEventListener('click', () => {
        CartItems.forEach((item) => {
            if (item.id === Product.id) {
                CartItems = CartItems.filter(item => item.id !== Product.id);
                individual.remove()
                ChectTotal()
            }
        })
    })
}
const Decrease = (individual, Product) => {
    individual.querySelector('.decrease').addEventListener('click', () => {
        CartItems.forEach((item) => {
            if (item.id === Product.id) {
                if (item.quantity > 1) {
                    individual.querySelector('.cart-quantity').innerText = --item.quantity
                } else {
                    CartItems = CartItems.filter(item => item.id !== Product.id);
                    individual.remove()

                }
                ChectTotal()

            }
        })
    })
}



