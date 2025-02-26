const SERVER_URL = "http://localhost:5000";

async function submitFeedback(event) {
    // event.preventDefault(); // Prevent the form from submitting traditionally

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const rating = document.querySelector('input[name="rating"]:checked');

    // Ensure all fields are filled
    if (!name || !message || !rating) {
        alert("Please fill in all fields and select a rating!");
        return;
    }
    else{
        alert("thank you for your feedback")
    }

    const selectedRating = rating.value;

    console.log("Sending feedback:", { name, message, rating: selectedRating });

    try {
        // Send the feedback data to the backend
        const res = await fetch(`${SERVER_URL}/auth/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, message, rating: selectedRating })
        });

        if (!res.ok) {
            // Handle any HTTP errors (non-2xx status codes)
            const errorData = await res.json();
            console.error("Error from backend:", errorData.error || "Unknown error");
            alert("There was an error submitting your feedback.");
            return;
        }

        const response = await res.json();  // Capture the JSON response

        // Check for success
        if (response.status === true) {
            alert("Thank you for your feedback!");
            console.log("Feedback stored:", response.newFeedback);
        } else {
            // Log any unexpected response from the backend
            console.error("Unexpected response from backend:", response);
            alert("There was an error submitting your feedback.");
        }
    } catch (error) {
        // Catch unexpected errors and log them
        console.error("Unexpected error occurred during the feedback submission:", error);
        alert("An unexpected error occurred. Please try again.");
        console.error("Error stack:", error.stack);  // Log the error stack for more insight
    }
}
