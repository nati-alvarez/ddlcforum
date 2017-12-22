var errMessage = document.getElementById("error");
function validateLogin(event){
    username = event.currentTarget.children[1].children[0].value;
    password = event.currentTarget.children[2].children[0].value;
    if(!username || !password){
        if(!errMessage) {
            errMessage = document.createElement("div");
            errMessage.id = "error";
            errMessage.innerHTML =
            `<p>All fields are required</p>
            <button onclick="closePrompt(event)" class="prompt-ok button-outlined">Ok</button>
            `;
            document.body.appendChild(errMessage);
        }else{
            errMessage.innerHTML =
                `<p>All fields are required</p>
                <button onclick="closePrompt(event)" class="prompt-ok button-outlined">Ok</button>
                `;
            errMessage.style.display = "block";
        }
        return false;
    }

    return true;
}

function validateSignup(event){
    username = event.currentTarget.children[1].children[0].value;
    password = event.currentTarget.children[2].children[0].value;
    confirm = event.currentTarget.children[3].children[0].value;

    if(!username || !password || !confirm){
        if(!errMessage) {
            errMessage = document.createElement("div");
            errMessage.id = "error";
            errMessage.innerHTML =
            `<p>All fields are required</p>
            <button onclick="closePrompt(event)" class="prompt-ok button-outlined">Ok</button>
            `;
            document.body.appendChild(errMessage);
        }else{
            errMessage.innerHTML =
                `<p>All fields are required</p>
                <button onclick="closePrompt(event)" class="prompt-ok button-outlined">Ok</button>
                `;
            errMessage.style.display = "block";
        }
        return false;
    }else if (password !== confirm){
        if(!errMessage) {
            errMessage = document.createElement("div");
            errMessage.id = "error";
            errMessage.innerHTML =
            `<p>Passwords do not match</p>
            <button onclick="closePrompt(event)" class="prompt-ok button-outlined">Ok</button>
            `;
            document.body.appendChild(errMessage);
        }else{
            errMessage.innerHTML =
                `<p>Passwords do not match</p>
                <button onclick="closePrompt(event)" class="prompt-ok button-outlined">Ok</button>
                `;
            errMessage.style.display = "block";
        }
        return false;
    }

    return true;
}