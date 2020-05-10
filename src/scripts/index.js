let savedData= null;


let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=d84c79b5c841468d829306c08c9ebd4e";
 
let search = function(keyword){
 let searchUrl = url + `&q=${keyword}`;
 callApi(searchUrl);
}
let ShowAll= function(){
    document.getElementById("news-articles").style.display = "grid";
    document.getElementById("SingleResults").style.display = "none";

 
}
let handleClick =function(elementNum){
    // console.log(elementNum);
    console.log(savedData[elementNum]);
    let htmlChunk ="template data";
    document.getElementById("SingleResults").innerHTML = htmlChunk;
    
    document.getElementById("news-articles").style.display = "none";


}
let handleSearch =function(){
    if(event.keyCode==13){
        var searchInput = document.getElementById("search");
        search(searchInput.value);
    }
    
}
let prepareHTMLFromData = function (dataArr){
    console.log(dataArr);
let finalHTML ='';
if(dataArr.length == 0){
    document.getElementById("ResultCount").innerHTML="";
    //document.getElementById("news-articles").innerHTML = "no results";
    document.getElementById("news-articles").innerHTML = '<li class="not-found">No article was found based on the search.</li>';
    return;
}


for(let i = 0; i < dataArr.length; i++){
    console.log(dataArr[i]);

    let htmlString = `
    
    <li class="article" onclick="handleClick(${i})">
    <div class="img_area">
    <img Class="article-img" src="${dataArr[i]["urlToImage"]}"> </div>
        <h2  class="article-title">${dataArr[i]["title"]}</h2> 
        <p class="article-description">${dataArr[i]["description"]} </p><br>
        <span class="article-author">${dataArr[i]["author"]} </span> <br>
        
       </li>` ;

        finalHTML = finalHTML + htmlString;
console.log(finalHTML);


}
document.getElementById("ResultCount").innerHTML= `Result Count ${dataArr.length}`;
document.getElementById("news-articles").innerHTML = finalHTML;
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
