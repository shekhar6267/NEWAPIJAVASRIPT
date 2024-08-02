const API_KEY = "fa864b80c1e74a8989aad4ba13e13de1";
const url = "https://newsapi.org/v2/everything?q="; 

window.addEventListener('load',()=>fetchNew("india"))  

function reload(){
    window.location.reload();
}

async function fetchNew(query) { 
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =await res.json() 
    bindData(data.articles)
    
} 

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container"); 
    const newsCardTemplate =document.getElementById("template-news-cards");  


    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
} 

function fillDataInCard(cardClone,article){

    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`; 

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
     
} 
 
const curSelectNav = null 
function  onNavItemClick(id){
    fetchNew(id) 
    const newitem=document.getElementById(id) 
    curSelectNav?.classList.remove('active'); 
    curSelectNav =newitem; 
    curSelectNav.classList.add("active")
}  

const searchbutton = document.getElementById('search-button') 
const searchText = document.getElementById('search-text')  

searchbutton.addEventListener("click",()=>{
    const query= searchText.value ; 
    if(!query) return ;  
    fetchNew(query) 
    curSelectNav?.classList.remove("active") 
    curSelectNav = null;

})
