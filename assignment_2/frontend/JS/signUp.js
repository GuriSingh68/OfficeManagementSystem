document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Capture form data
    const firstName = document.getElementById('signup_fname').value;
    const lastName = document.getElementById('signup_lname').value;
    const email = document.getElementById('signup_email').value;
    const countryCode = document.getElementById('signup_country_code').value;
    const mobile = document.getElementById('signup_mobile').value;
    const dob = document.getElementById('signup_dob').value;
    const password = document.getElementById('signup_password').value;
    const confirmPassword = document.getElementById('signup_ConfirmPassword').value;

    // Ensure password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Prepare data to be sent to the backend
    const signupData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: `${countryCode} ${mobile}`,
        dob: dob,
        password: password
    };

    try {
        // Send a POST request to the backend
        const response = await fetch('http://localhost:3000/user/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(`${result.message}`); // Success message from the backend
            window.location.href = 'index.html'; // Redirect to login page
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during sign up');
    }
});
