

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("load js");
    const readUrl = "/read";
    fetch(readUrl)
    .then(response=>response.json())
    .then(data=>{
        console.log();
    })
})


