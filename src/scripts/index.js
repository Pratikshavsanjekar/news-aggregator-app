
var url = 'https://newsapi.org/v2/top-headlines?'+
'country=in&'+
'apiKey=d84c79b5c841468d829306c08c9ebd4e';
let httpGetAsync = (theUrl, callback) => {

var xmlHttp = new XMLHttpRequest();


xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        
        callback(xmlHttp.responseText);
    }
}

xmlHttp.open("GET", theUrl, true); 
xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlHttp.send(null);
}

let nodeCreated = `
<li class="article">
  <img class="article-img" src="IMG-20180709-WA0015.jpg" alt="image" style="width:100%">
  <h2 class="article-title"> hello hii</h2>
  <p class="article-description">hxjhsgyghwyugyuvyux6fwxgfw</p>
  <span class="article-author" style="display: block;"> shaikh.a.a</span>
  <a class="article-link" href="google.com"> hhjh</a>
</li>
`;

let output = "";

let makeSomeHTML = (response) => {
let obj = JSON.parse(response);
let dataArr = obj["articles"];
  for (let i = 0; i < dataArr.length; i++) {
      let currObj = dataArr[i];
      let atitle = currObj["title"];
      let aauthor = currObj["author"];
      let adescription = currObj["description"];
      let aimage = currObj["urlToImage"];
      let alink = currObj["url"];
      let outTemplate = `
             <li class="article">
                  <img  class="article-img" src="${aimage}" alt="image" style="width:100%" ><br><br>
                  <h2 class="article-title"> ${atitle}</h2><br>
                  <p class="article-description">${adescription || "DEscription not available"}</p><br>
                  <span class="article-author" style="display: block;"> ${aauthor}</span><br>
                  <a class="article-link" href="${alink}">link to page </a>
            </li>    
        `;
    output = output+ outTemplate;
    
  
}
document.querySelector('#news-articles').innerHTML = output;
}
httpGetAsync(url, makeSomeHTML);

const searchFrom = document.querySelector(".form-search");
const input = document.getElementById("search");

searchFrom.addEventListener('submit',retrieve)


function retrieve(e){
e.preventDefault() 
let topic=input.value;
let url1 =   `https://newsapi.org/v2/everything?q=${topic}&apiKey=8857ddfa72ae47238500738f55cc70f1`

let output = "";



let makeSomeHTML1 = (response) => {
let obj = JSON.parse(response);
let dataArr = obj["articles"];   
for (let i = 0; i < dataArr.length; i++) {
let currObj = dataArr[i];
let atitle = currObj["title"];
let aauthor = currObj["author"];
let adescription = currObj["description"];
let aimage = currObj["urlToImage"];
let alink = currObj["url"];
let outTemplate = `
  <li class="article">
       <img  class="article-img" src="${aimage}" alt="${atitle}" style="width:100%" ><br><br>
       <h2 class="article-title"> ${atitle}</h2><br>
       <p class="article-description">${adescription || "DEscription not available"} </p><br>
       <span class="article-author" style="display: block;"> ${aauthor}</span><br>
       <a class="article-link" href="${alink}">link to page </a>
 </li>    
`;
output = output+ outTemplate; 
}

let select = document.querySelector('.not-found');

if (obj.totalResults == 0 ){   
 select.innerHTML = "No article was found based on the search.";             
}


document.querySelector('#news-articles').innerHTML = output;
}
httpGetAsync(url1, makeSomeHTML1);
}




// reload
var btn = document.querySelector("#clearbtn");

btn.addEventListener("click", function(e){

e.preventDefault();

location.reload(true);

});
