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
        name: 'Chicken Lolipop',
        image: 'lolipup.jpg',
        price: 170
    },
    {
        id: 2,
        name: 'Chicken Kabab(8-PC)',
        image: 'kabab.webp',
        price: 220
    },
    {
        id: 3,
        name: 'Chicken Urval',
        image: 'urvolu.jpg',
        price: 280
    },
    {
        id: 4,
        name: 'Shawarma',
        image: 'shwarma.jpg',
        price: 99
    },
    {
        id: 5,
        name: 'Chicken Pepper',
        image: 'pepper.jpeg',
        price: 240
    },
    {
        id: 6,
        name: 'Chicken Manchorian',
        image: 'mmnchorian.jpeg',
        price: 200
    },
    {
        id: 7,
        name: 'Grilled Chicken',
        image: 'grilled.jpeg',
        price: 240
    },
    {
        id: 8,
        name: 'Garlic Chicken ',
        image: 'garlic.jpeg',
        price: 220
    },
    {
        id: 9,
        name: 'Chicken Wings ',
        image: 'wings.jpeg',
        price: 200
    },
    {
        id: 10,
        name: 'Chicken Sukka',
        image: 'sukka.jpeg',
        price: 240
    },
    {
        id: 11,
        name: 'Kori Rotti',
        image: 'korirotti.jpeg',
        price: 100
    },
    {
        id: 12,
        name: 'Chicken KFC',
        image: 'kfc.jpeg',
        price: 220
    }
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹ ${value.price.toLocaleString()}.00</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard(key){
    let newItem = products[key]
    newItem.quantity = 1;

    let currentCart = JSON.parse(localStorage.getItem("food_cart_items")) || []
    let updatedCart = [...currentCart, newItem]
    localStorage.setItem("food_cart_items", JSON.stringify(updatedCart))

    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div> ₹ ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count"> ${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    let currentCart = JSON.parse(localStorage.getItem("food_cart_items")) || []
    let itemIndex = currentCart.findIndex(item => item.key === key)

    if(itemIndex !== -1){
        if(quantity === 0)
            currentCart.splice(itemIndex, 1)
        else{
            currentCart[itemIndex].quantity = quantity
            currentCart[itemIndex].price =  quantity * products[key].price
        }
    }

    localStorage.setItem("food_cart_items", JSON.stringify(currentCart))
    reloadCard();
}