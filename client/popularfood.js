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
        id: 1,
        name: 'Pineapple Juice',
        image: 'pinapple.jpg',
        price: 65.00
    },
    {
        id: 2,
        name: 'Blue Mojito Juice',
        image: 'mojito.jpeg',
        price: 80.00
    },
    {
        id: 3,
        name: ' Mango Juice',
        image: 'mango.jpeg',
        price: 70.00
    },
    {
        id: 1,
        name: 'Non-Veg Pizza',
        image: 'food-5.png',
        price:299
    },
    {
        id: 2,
        name: 'Veg Pizza',
        image: 'food-6.png',
        price: 199
    },
    {
        id: 3,
        name: 'Delicious Pizza',
        image: 'food-3.png',
        price: 249
    },

    {
        id: 1,
        name: 'Chicken Biriyani',
        image: 'CB.jpeg',
        price: 160
    },
    {
        id: 2,
        name: 'Bamboo Biriyani',
        image: 'bamboo.jpeg',
        price: 190
    },
    {
        id: 3,
        name: 'Dum Biryani',
        image: 'dumm.jpeg',
        price: 249
    },
    {
        id: 1,
        name: 'Chicken Combo with Chicken Biriyani alfaham chicken and chicken Curry ',
        image: 'combobiriyani.jpg',
        price: 350
    },
    {
        id: 2,
        name: 'Chicken Combo with KFC-4pc, french fries and Soft Drink ',
        image: 'chickencombo.jpeg',
        price: 180
    },
    {
        id: 3,
        name: 'Nati Style Chicken Biriyani with 5pc Kabab',
        image: 'CBcombo.jpg',
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
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
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
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}