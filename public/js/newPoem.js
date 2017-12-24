var errMessage = document.getElementById("error");

function newPoem(e){
    var title = e.target.children[0].value;
    var body = e.target.children[1].value;
    if(!title || !body){
        if(!errMessage){
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
}