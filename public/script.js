let storedData;
let index;
document.addEventListener("DOMContentLoaded", ()=>{
    console.log("load js");
    const readUrl = "/read";
    fetch(readUrl)
    .then(response=>response.json())
    .then(data=>{
        storedData = data;
        index = storedData.length;
        console.log("index: ",index);
        console.log("json data: ", data)
        // get the first 2 elements slice(0, 2), get the last two (-3, -1)
        update(storedData);
    
        $("#newMessageButton").click(function(){
            newMsg = document.getElementById("inputMessage").value;
            newUserName = document.getElementById("inputUserName").value;
            console.log(newMsg);
            if (newMsg!='' && newUserName!=''){
                let newData =  { message : newMsg, name : newUserName};
                storedData.push(newData);
                console.log(storedData);
                index = storedData.length;

                const updateUrl = "/push"
                fetch(updateUrl, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: newData
                    })
                }).then(response => response.json())

                update(storedData)
                
            }
            
            
        })
        $("#prevMessageButton").click(function(){
            index = index - 2
            if (index<=1){
                index = storedData.length;
            }
            update(storedData)
        })
    })
})

// from d3ourNames.html (https://publish.uwo.ca/~jmorey2/ece/d3/d3ourNames.html)
// use same style for enter and update, data is different, remove directly for "exit" 
const messageSection = d3.select('#messages')
            .attr('width', 800)
            .attr('height', 100);
  
  let update= data => {
    messageSection.selectAll('text')
      .data( storedData.slice(0, index).slice(-2), d => d.message )
      .join(
        enter => enter.append('text')
            .attr('transform', (d,i) => `translate(${ 30 },${ 20+ i * 30 })`)
            .attr('x', 5)
            .attr('dy', '1.25em')
            .style('font-size', 14)
            .style('font-family', 'sans-serif')
            .style('fill', 'blue')
            .style('opacity', 0)
            .text(d => `${d.message}  \u00A0\u00A0 -- ${d.name}`)
            .transition().duration(1000)
            .style('opacity', 1)
            .selection()
        ,
        update => update
          .transition().duration(1000)
          .attr('transform', (d,i) => `translate(${ 30 },${ 20+ i*30 })`)
          .style('fill', 'black')
            .selection(),
        exit => exit
          //.style('fill', 'red')
          //.transition().duration(1000)
            //.attr('transform', (d,i) => `translate(${ 100 },${20+ i*30 })`)
            .remove()
      )
  }

