let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Neer Dosa',
        image: 'neer-dose.jpeg',
        price: 30
    },
    {
        id: 2,
        name: 'Masal Dosa',
        image: 'masaldosa.jpeg',
        price: 50
    },
    {
        id: 3,
        name: 'Parota',
        image: 'parota.jpeg',
        price: 30
    },
    {
        id: 4,
        name: 'Chapati',
        image: 'chapati.jpeg',
        price: 25
    },
    {
        id: 5,
        name: 'Tuppa Dosa',
        image: 'tuppadosa.jpeg',
        price: 45
    },
    {
        id: 6,
        name: 'Rava Dosa',
        image: 'ravadosa.jpeg',
        price: 40
    },
    {
        id: 7,
        name: 'Pundi Gasi',
        image: 'pundigasi.jpeg',
        price: 30
    }
];

function initApp(){
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹ ${value.price.toLocaleString()}.00</div>
            <button onclick="addToCard(${key})">Order</button>`;
        list.appendChild(newDiv);
    })

    reloadCard()
}
initApp();



function addToCard(key) {
    let newItem = products[key];
    if (!newItem) {
        console.error(`Invalid product key: ${key}`);
        return;
    }

    let currentCart = JSON.parse(localStorage.getItem("food_cart_items")) || [];

    let existingItem = currentCart.find(item => item && item.id === newItem.id);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = existingItem.quantity * products[key].price;
    } else {
        newItem.quantity = 1;
        currentCart.push(newItem);
    }

    localStorage.setItem("food_cart_items", JSON.stringify(currentCart));
    reloadCard();
}





function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    let currentCart = JSON.parse(localStorage.getItem("food_cart_items")) || [];

    currentCart.forEach((value, key) => {
        // Skip null or undefined items
        if (!value) {
            console.warn(`Skipping invalid item at key ${key}:`, value);
            return;
        }

        // Calculate total price and item count
        totalPrice += value.price || 0;
        count += value.quantity || 0;

        // Create cart item UI
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="image/${value.image}" /></div>
            <div>${value.name}</div>
            <div>₹ ${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}



function changeQuantity(key, quantity) {
    console.log("Changing quantity for key:", key, "New quantity:", quantity);

    let currentCart = JSON.parse(localStorage.getItem("food_cart_items")) || [];

    if (quantity === 0) {
        currentCart.splice(key, 1); // Remove item if quantity is 0
    } else {
        currentCart[key].quantity = quantity;
        currentCart[key].price = quantity * products.find(p => p.id === currentCart[key].id).price;
    }

    console.log("Updated Cart:", currentCart);
    localStorage.setItem("food_cart_items", JSON.stringify(currentCart));
    reloadCard();
}