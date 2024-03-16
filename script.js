const inputBox = document.getElementById("input-box")
const initiative = document.getElementById("initiative-container")

function addChar(){
    if(inputBox.value === ""){
        alert("Please enter a name")
    }
    else {
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        initiative.appendChild(li)
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    inputBox.value = ""
}

initiative.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){ 
        e.target.classList.toggle("dead")
    }   
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
    }
}, false)