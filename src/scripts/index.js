let savedData= null;


let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=d84c79b5c841468d829306c08c9ebd4e";
// let url ="https://newsapi.org/v2/everything?q=bitcoin&apiKey=d84c79b5c841468d829306c08c9ebd4e";
let search = function(keyword){
 let searchUrl = url + `&q=${keyword}`;
 callApi(searchUrl);
}
let ShowAll= function(){
    document.getElementById("results").style.display = "grid";
    document.getElementById("SingleResults").style.display = "none";

 
}
let handleClick =function(elementNum){
    // console.log(elementNum);
    console.log(savedData[elementNum]);
    let htmlChunk ="template data";
    document.getElementById("SingleResults").innerHTML = htmlChunk;
    
    document.getElementById("results").style.display = "none";


}
let handleSearch =function(){
    if(event.keyCode==13){
        var searchInput = document.getElementById("SearchBox");
        search(searchInput.value);
    }
    
}
let prepareHTMLFromData = function (dataArr){
    console.log(dataArr);
let finalHTML ='';
if(dataArr.length == 0){
    document.getElementById("ResultCount").innerHTML="";
    document.getElementById("results").innerHTML = "no results";
    return;
}

for(let i = 0; i < dataArr.length; i++){
    console.log(dataArr[i]);

    let htmlString = `
    <div class="item" onclick="handleClick(${i})">
    <img class="imgStyle" src="${dataArr[i]["urlToImage"]}"> 
        <div>${dataArr[i]["title"]}</div> 
       <div>${dataArr[i]["description"]} </div> 
       <div>${dataArr[i]["author"]} </div> 
       </div>` ;

        finalHTML = finalHTML + htmlString;
console.log(finalHTML);

}
document.getElementById("ResultCount").innerHTML= `Result Count ${dataArr.length}`;
document.getElementById("results").innerHTML = finalHTML;
// document.getElementById("results").innerHTML = htmlString;
}

let callApi = function(url){
    let myPromise = fetch(url);   
    myPromise.then(function(response){
        response.json().then(
            function(responseInner){
            console.log(responseInner);
                if(responseInner.articles){
                    savedData = [...responseInner.articles];
                   prepareHTMLFromData(responseInner.articles)
                }
        })
        .catch(function(error){
            console.log("error");
        });
    }).catch(function(error){
    console.log(error);
    })
}
callApi(url);
