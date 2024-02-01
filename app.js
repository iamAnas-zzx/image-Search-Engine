
//User your api key here
import apiID from './config.js';
const form = document.querySelector('#searchForm');
const box = document.querySelector('#searchPlace');
const displayDiv = document.querySelector('#searchResult');
const seacrhBtn = document.querySelector('#searchMore');

//setting up the api key 
const apiKey = apiID.key; 

let page = 1;

async function searchImages(e) {
    const searchTerm = box.value ;
    console.log(searchTerm);
    if(page === 1){
        displayDiv.innerHTML = "";
    }
    
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=${apiKey}&per_page=12`);
    const  data = await response.json();
    console.log(data);
    if(data.results.length === 0){
        const l =  document.createElement('h2');
        l.innerText = "Please write correct spelling."
        displayDiv.appendChild(l);
    }else{
        makeImages(data.results);
        seacrhBtn.style.display = 'block';
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

seacrhBtn.addEventListener('click', ()=>{
    page++;
    searchImages();
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.urls.small) {
            const img = document.createElement('IMG');
            img.src = result.urls.small;
            displayDiv.appendChild(img);
        }
    }
}