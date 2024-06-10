var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var alertMsg = document.getElementById("alertMsg");
var invalidMsg = document.getElementById("invalidMsg");

var regName = document.getElementById("regName");
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPassword");
var regAlertMsg = document.getElementById("regAlertMsg");
var emailExistsMsg = document.getElementById("emailExistsMsg");
var regSuccessMsg = document.getElementById("regSuccessMsg");
var welcomeMsg = document.getElementById("welcomeMsg")
// Simulated database of registered users






var registeredUsers = [];
if (localStorage.getItem('registeredUsers') == null) {
    registeredUsers = [];
} else {
    registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
}


function validateInput(element) {
    var regex = {
        emailInput: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        passwordInput: /^[A-Za-z\d]{8,}$/,
        regEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        regPassword: /^[A-Za-z\d]{8,}$/
    };

    if (regex[element.id].test(element.value)) {
        
        return true;
    } else {
        
        return false;
    }
}

function checkForBlank(inputs) {
    var allFilled = true;

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.value.trim() === "") {
           
            allFilled = false;
        }
    }

    return allFilled;
}




function validateLoginForm() {
    var isValidEmail = validateInput(emailInput);
    var isValidPassword = validateInput(passwordInput);
    var isNotBlank = checkForBlank([emailInput, passwordInput]);

    if (!isNotBlank) {
        alertMsg.textContent = "All inputs are required.";
        alertMsg.classList.remove("d-none");
        invalidMsg.classList.add("d-none");
    } else if (!isValidEmail || !isValidPassword) {
        invalidMsg.textContent = "Invalid email or password format.";
        invalidMsg.classList.remove("d-none");
        alertMsg.classList.add("d-none");
    } else {
        // Check if the email exists in the registered users
        var user = registeredUsers.find(user => user.email === emailInput.value);
        if (user) {
            // Check if the password matches
            if (user.password === passwordInput.value) {
                // Successful login
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = "home.html";
                return false;
            } else {
                // Password does not match
                invalidMsg.textContent = "Invalid password.";
                invalidMsg.classList.remove("d-none");
                alertMsg.classList.add("d-none");
            }
        } else {
            // Email does not exist
            invalidMsg.textContent = "Invalid email.";
            invalidMsg.classList.remove("d-none");
            alertMsg.classList.add("d-none");
        }
    }
    return false; 
}







function validateRegistrationForm() {
    var isValidEmail = validateInput(regEmail);
    var isValidPassword = validateInput(regPassword);
    var isNotBlank = checkForBlank([regName, regEmail, regPassword]);

    if (!isNotBlank) {
        regAlertMsg.textContent = "All inputs are required.";
        regAlertMsg.classList.remove("d-none");
        regSuccessMsg.classList.add("d-none");
        emailExistsMsg.classList.add("d-none");
    } else if (!isValidEmail || !isValidPassword) {
        regAlertMsg.classList.add("d-none");
        emailExistsMsg.classList.add("d-none");
        regSuccessMsg.classList.add("d-none");
        regAlertMsg.textContent = "Invalid email or password.";
        regAlertMsg.classList.remove("d-none");
    } else if (registeredUsers.some(user => user.email === regEmail.value)) {
        regAlertMsg.classList.add("d-none");
        emailExistsMsg.textContent = "Email already exists.";
        emailExistsMsg.classList.remove("d-none");
        regSuccessMsg.classList.add("d-none");
    } else {
        registeredUsers.push({
            name: regName.value,
            email: regEmail.value,
            password: regPassword.value
        });
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        regAlertMsg.classList.add("d-none");
        emailExistsMsg.classList.add("d-none");
        regSuccessMsg.textContent = "Registration successful.";
        regSuccessMsg.classList.remove("d-none");
        
        clearInput();
        return false; 
    }
    return false; 
}

function showRegistrationForm() {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("registrationForm").classList.remove("d-none");
}

function showLoginForm() {
    document.getElementById("registrationForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
}



function clearInput() {
    regName.value =null
    regEmail.value = null;
    regPassword.value = null;
}
