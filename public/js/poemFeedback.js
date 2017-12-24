function likePoem(poemId){
    var ajax = new XMLHttpRequest();
    var likesCounter = document.getElementById("likes-counter");
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            if(ajax.responseText === "true"){
              likesCounter.innerHTML = Number(likesCounter.innerHTML) + 1;
            }
        }
    }
    ajax.open("GET", `/poem/${poemId}/like`, true);
    ajax.send();
}

function dislikePoem(poemId){
    var ajax = new XMLHttpRequest();
    var dislikesCounter = document.getElementById("dislikes-counter");
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            if(ajax.responseText === "true"){
                dislikesCounter.innerHTML = Number(dislikesCounter.innerHTML) + 1;
            }
        }
    }
    ajax.open("GET", `/poem/${poemId}/dislike`, true);
    ajax.send();
}