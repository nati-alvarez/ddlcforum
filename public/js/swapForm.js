swapFormBtn = document.getElementById('swap-form');
loginForm = document.getElementById("login-form");
signupForm = document.getElementById("signup-form");

//hide login form
loginForm.style.display = "none";

swapFormBtn.addEventListener("click", swapForms);

function swapForms(){
    if(loginForm.style.display == "none"){
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        swapFormBtn.innerHTML = "Don't have an account? <span style='color: #b26a9c;'>Sign Up!</span>";
    }else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        swapFormBtn.innerHTML = "Have an account? <span style='color: #b26a9c;'>Log In!</span>";
    }
}