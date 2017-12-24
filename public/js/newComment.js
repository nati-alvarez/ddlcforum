function newComment(event){
    var comments = document.getElementById("comments");
    var poemId = event.target.children[2].dataset.id;
    var commentBody = event.target.children[1].value;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(ajax.responseText);
            var newComment = `
            <div id="comment-${response.id}" class="comment">
                <div class="comment-author heading-outlined">${response.author}</div>
                <div class="transparent-bg"></div>
                <div class="transparent-pink"></div>
                <div class="comment-body">
                    ${response.body}
                </div>
            </div>
            `;
            comments.innerHTML += newComment;
            document.getElementById(`comment-${response.id}`).scrollIntoView();
            event.target.children[1].value = "";
        }
    }
    ajax.responseText = "json";
    ajax.open("POST", `/poem/${poemId}`);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`body=${commentBody}&id=${poemId}`);
    return false;
} 