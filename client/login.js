const SERVER_URL = "http://localhost:5000"

// Send Login request to Server
async function handleLogin(event){
    // event.preventDefault()
    
    const email = document.getElementById("log-email").value
    const password = document.getElementById("log-password").value

    // console.log({email, password})

    if(!email || !password){
        alert("Email or Password cannot be empty!")
    }

    // http://localhost:5000/auth/login
    const res = await fetch(`${SERVER_URL}/auth/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })

    if(res.status === 200){
        console.log("User Logged In Successfully!")
        sessionStorage.setItem('isLoggedIn', 'true'); // Save login status
        window.location.href = 'index.html'; // Redirect to index.html
    }else{
        sessionStorage.setItem('isLoggedIn', 'false'); // Save login status
        alert("Invalid Email or Password")
    }




    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address with both '@' and '.'!");
        return;
    }
}


// Send Register request to Server
async function handleRegister(event){
    // event.preventDefault()
    
    const username = document.getElementById("reg-username").value
    const email = document.getElementById("reg-email").value
    const password = document.getElementById("reg-password").value
    const phone = document.getElementById("reg-phone").value
    console.log({username, email, password, phone})

    if(!username || !email || !password || !PaymentMethodChangeEvent){
        alert("Enter all Fields!")
    }
    

    const res = await fetch(`${SERVER_URL}/auth/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username, email, password, phone})
    })

    if(res.status === 200){
        console.log("User Registered Successfully!")
        alert("User Registered Successfully!")
    }else{
        alert("Invalid Email or Password")
    }




    const usernameRegex = /^[A-Za-z\s]+$/;
    if (!usernameRegex.test(username)) {
        alert("Username can only contain letters and spaces!");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address with both '@' and '.'!");
        return;
    }

    if (password.length > 8) {
        alert("Password must be no more than 8 characters!");
        return;
}

}