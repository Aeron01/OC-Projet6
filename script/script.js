import { selectCategory } from "./filter.js";

let _loged = false;
export function loged () {
    return _loged;
}
export function initToken () {
    setToken(localStorage.getItem("token"),
    localStorage.getItem("userId")
    );
}

const ILLEGAL_USERID = ["null", "undefined", "NaN", ""]

export function setToken (token, userId) {
    _loged = (!!token && userId && !ILLEGAL_USERID.includes(userId));
    if (!_loged) {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
    } else {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId)
    }
}

export function getAuth() {
    return {
        token: localStorage.getItem("token"),
        userId: +localStorage.getItem("userId")
    }
}

export function createNavigation () {
    const links = [
        {id:"nav-home", link: "./index.html"},
        {id:"nav-projects", link: "./index.html#portfolio"},
        {id:"nav-contact", link: "./index.html#contact"},
        {id:"nav-login", link: "./login.html"},
        {id:"nav-instagram", link: "https://www.instagram.com/sophiebluel/"},
        {id:"nav-cgu", link: "./legal-mention.html"},
    ];


    for (let item of links) {
        const element = document.getElementById(item.id);
        if (element) {
            element.onclick=()=> {
                window.location.href=item.link;
            }
        }
    }

    logButton();

}


function logButton () {
    const logedBtn = document.getElementById("nav-login");
    logedBtn.onclick=()=> {
        if(loged()){
            setToken("");
            window.location.href="./index.html";
        } else {
            window.location.href="./login.html";
        }
    }
}


export function createCard (card, parent){
    const figure=document.createElement("figure")
    const img=document.createElement("img")
    const caption=document.createElement("figcaption")
    img.src=card.imageUrl
    img.alt=card.title
    caption.textContent=card.title
    figure.id=card.id
    figure.categoryId=card.categoryId
    figure.setAttribute=card.categoryId
    figure.appendChild(img)
    figure.appendChild(caption)
    parent.appendChild(figure)
    return figure;
}

export function createCards (data){
    const container=document.querySelector(".gallery")
    //console.log(data)
    return data.map((card)=> createCard(card, container));
}



export function createFilters (categories){
    
    categories.unshift({id:0, name:"Tous"});
    const container=document.querySelector("#filters")
    for (let categorie of categories) {
        const elem = document.createElement("span")
        elem.textContent = categorie.name;
        elem.id = categorie.id;
        elem.classList.add("btn", "filter");

        container.appendChild(elem);
    }

    selectCategory (container.querySelector("span"));
    
}

export function createSelectCats (selectCats) {
    const selectContainer=document.querySelector("#category-id")
    
    for (let selectCat of selectCats) {
        if (selectCat.id === 0) continue; {
            const selectElem = document.createElement("option")
            selectElem.textContent = selectCat.name
            selectElem.value = selectCat.id
            selectContainer.appendChild(selectElem);
        }
    }
}