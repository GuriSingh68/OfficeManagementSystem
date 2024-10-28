document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Capture the form data
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    // Data to be sent to the backend
    const loginData = {
        email: email,
        password: password
    };

    try {
        // Send a POST request to the backend
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            // You can also redirect to another page after successful login
            window.location.href = "dashboard.html";
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
});
