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

// Verifie UserId & setting Token
const ILLEGAL_USERID = ["null", "undefined", "NaN", ""];

export function setToken (token, userId) {
    _loged = (!!token && userId && !ILLEGAL_USERID.includes(userId));
    if (!_loged) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    } else {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
    }
}

// function for get the authorisation stocked in local storage
export function getAuth() {
    return {
        token: localStorage.getItem("token"),
        userId: +localStorage.getItem("userId")
    }
}

// function for create the site navigation
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

// function using token storage on login page to verify if you loged or not
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

// function for creating card for each pictures of the project
export function createCard (card, parent) {
    const figure=document.createElement("figure");
    const img=document.createElement("img");
    const caption=document.createElement("figcaption");
    img.src=card.imageUrl;
    img.alt=card.title;
    caption.textContent=card.title;
    figure.id=card.id;
    figure.categoryId=card.categoryId;
    figure.setAttribute=card.categoryId
    figure.appendChild(img);
    figure.appendChild(caption);
    parent.appendChild(figure);
    return figure;
}

// function that retrieves data for the creation of all cards
export function createCards (data) {
    const container=document.querySelector(".gallery");
    return data.map((card)=> createCard(card, container));
}

// function for creating all categories filters button 
export function createFilters (categories) {
    categories.unshift({id:0, name:"Tous"});
    const container=document.querySelector("#filters");
    for (let categorie of categories) {
        const elem = document.createElement("span");
        elem.textContent = categorie.name;
        elem.id = categorie.id;
        elem.classList.add("btn", "filter");
        container.appendChild(elem);
    }
    selectCategory(container.querySelector("span"));
}

//  category creation function for add new image selection form
export function createSelectCats (selectCats) {
    const selectContainer=document.querySelector("#category-id");
    for (let selectCat of selectCats) {
        if(selectCat.id === 0) {
            const selectElem = document.createElement("option");
            selectElem.textContent = "";
            selectElem.value = selectCat.id;
            selectContainer.appendChild(selectElem);
        } else {
            const selectElem = document.createElement("option");
            selectElem.textContent = selectCat.name;
            selectElem.value = selectCat.id;
            selectContainer.appendChild(selectElem);
        }
    }
}