const login =(event) => {
    event.preventDefault();
    alert("Login Sucsessful")
}
const signUp =(event) => {
    event.preventDefault();
    alert("Sign up Sucsessful")
}
document.getElementById("login_submit").addEventListener("click",login());
document.getElementById("create").addEventListener("click",signUp());


