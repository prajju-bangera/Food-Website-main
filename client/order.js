const SERVER_URL = "http://localhost:5000"

async function storeAmount(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var totNum = document.getElementById('totNum').value;
    var tableNumber = document.getElementById('tableNumber').value;
    var request = document.getElementById('requests').value;
    var totalAmount = document.getElementById('totalAmount').value;
    var delivery = document.getElementById('delivery').value;
    // var upi = document.getElementById('upi').value;

    var payment = delivery ? "delivery" : "upi"

    const OrderList = JSON.parse(localStorage.getItem("food_cart_items")) || [];
  
        
    if(!name || !email || !phone || !date || !time || !totNum || !tableNumber || !request || !totalAmount || !payment ||OrderList.length==0){
        alert("Enter all Fields!")
         return
    }
    console.log(OrderList)
    const payload={name, email, phone, date, time, totNum, tableNumber, request, totalAmount, payment, items:OrderList};
    console.log(payload)
    console.log({name, email, phone, date, time, totNum, tableNumber, request, totalAmount, payment})
  

    const res = await fetch(`${SERVER_URL}/auth/order`, {
        method:"POST",    
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload),
    })     

    if(res.status === 200){
        console.log("Order Created Successfully!")
        window.location.href = "/client/confirmOrder.html"
    }else{
        alert("Invalid Email or Password")
    }
}

// Update Order List
// Function to update the Order Preview Table
const updateOrderPreviewTable = () => {
    const OrderPreviewTable = document.getElementById("Order_Preview")?.querySelector("tbody");
    const OrderList = JSON.parse(localStorage.getItem("food_cart_items")) || [];

    if (OrderPreviewTable) {
        // Clear table content to avoid showing old data    
        OrderPreviewTable.innerHTML = "";

        if (OrderList.length > 0) {
            let row = "";
            let totalPrice = 0;

            // Filter valid items and process
            const validOrderList = OrderList.filter((item) => item && item.name && item.price && item.quantity);

            validOrderList.forEach((item, index) => {
                const price = item.price || 0;
                const quantity = item.quantity || 0;

                totalPrice += item.price;

                row += `<tr>
                    <td>${item.name || "N/A"}</td>
                    <td>${quantity}</td>
                    <td>${item.price}</td>
                    <td>${price}</td>
                </tr>`;
            });

            // Add total row
            row += `<tr class="Table_Bold">
                <td colspan="3">TOTAL</td>
                <td>${totalPrice}</td>
            </tr>`;

            // Add new rows to the table
            OrderPreviewTable.innerHTML = row;
            document.getElementById("totalAmount").value = totalPrice;
        } else {
            console.warn("No valid orders to display.");
        }
    } else {
        console.error("Order preview table not found.");
    }
};

console.log("Stored Items in LocalStorage:", JSON.parse(localStorage.getItem("food_cart_items")));


// Function to add a new item to the cart and update localStorage
const addItemToCart = (item) => {
    const currentItems = JSON.parse(localStorage.getItem("food_cart_items")) || [];
    console.log("Adding item to cart:", item); // Debugging step
    currentItems.push(item); // Add new item
    localStorage.setItem("food_cart_items", JSON.stringify(currentItems)); // Save updated list

    // Refresh the table to reflect new items
    updateOrderPreviewTable();
};
console.log("Current cart items:", JSON.parse(localStorage.getItem("food_cart_items")));


// Function to clear the form and table after submission
const clearFormAndTable = () => {
    // Clear all input fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("totNum").value = "";
    document.getElementById("request").value = "";

    // Clear the Order Preview table
    const OrderPreviewTable = document.getElementById("Order_Preview")?.querySelector("tbody");
    if (OrderPreviewTable) {
        OrderPreviewTable.innerHTML = ""; // Reset the table content
    }

    // Clear items from localStorage
    localStorage.removeItem("food_cart_items");
    console.log("Form and table cleared, localStorage reset.");
};


document.addEventListener('DOMContentLoaded', () => {
    // Your event listeners and functions go here
});


// Function to handle form submission
const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const name = document.getElementById('name')?.value;   // Optional chaining to prevent null issues
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const date = document.getElementById('date')?.value;
    const time = document.getElementById('time')?.value;
    const totNum = document.getElementById('totNum')?.value;
    const payment = document.getElementById('payment')?.value;
    const request = document.getElementById('request')?.value;

    console.log({ name, email, phone, date, time, totNum, payment, request });
    const OrderList = JSON.parse(localStorage.getItem("food_cart_items")) || [];

    // Validate input
    // if (!name || !email || !phone || !date || !time || !totNum || !payment || !request) {
    //     alert("Your Order is Sucessufully Completed");
    //     return;
    // }

    try {
        const res = await fetch(`${SERVER_URL}/auth/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, date, time, totNum, payment, request }),
        });

        if (res.status === 200) {
            console.log("User Registered Successfully!");
            clearFormAndTable(); // Clear the form and table after success
        } else {
            alert("Invalid Email or Password");
        }
    } catch (err) {
        console.error("Error during fetch:", err);
    }
};



// Attach the submit handler to the form
// document.querySelector("form").addEventListener("submit", handleSubmit);

// Call the function initially to load the table with current data
updateOrderPreviewTable();


// Update Table Seats
const TableNumber = document.getElementById("tableNumber")
const RoomType = document.getElementById("roomType")
const SeatList = JSON.parse(localStorage.getItem("food_seats"))

console.log(SeatList)
TableNumber.value = SeatList.selectedSeats.join(', ')
RoomType.value = SeatList.roomType

const handleRoomReselect = () =>{
    localStorage.setItem('food_seats', null);
    window.location.replace("/client/table.html")
}





// Function to handle radio button change
function radio_checked(radio) {
    const selectedPaymentMethod = radio.value;
    console.log("Selected Payment Method:", selectedPaymentMethod);

    // Example: Disable or enable other fields based on the selected payment method
    if (selectedPaymentMethod === "upi") {
        // Enable fields related to UPI payment
        document.getElementById('payment_upi_details').style.display = 'block'; // Assuming UPI fields exist
        document.getElementById('delivery_details').style.display = 'none'; // Hide other payment options
    } else if (selectedPaymentMethod === "delivery") {
        // Enable fields related to Pay on Delivery
        document.getElementById('payment_upi_details').style.display = 'none'; // Hide UPI fields
        document.getElementById('delivery_details').style.display = 'block'; // Show Pay on Delivery fields
    }
}

document.querySelectorAll('input[name="paymentradio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        radio_checked(this); // Call the function and pass the radio input element
    });
});
