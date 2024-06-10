function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}




var username = localStorage.getItem('registeredUsers');
if (username) {
    document.getElementById('welcomeMsg').innerHTML = "Welcome "
}
