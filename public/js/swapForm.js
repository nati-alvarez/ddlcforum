swapFormBtn = document.getElementById('swap-form');
loginForm = document.getElementById("login-form");
signupForm = document.getElementById("signup-form");

//hide login form
loginForm.style.display = "none";

swapFormBtn.addEventListener("click", swapForms);

function swapForms(){
    console.log("doing it");
    if(loginForm.style.display == "none"){
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    }else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}