function loadHeader(){
    document.querySelector("header").innerHTML=`
    <div class="editorMod hidden">
        <span class="far fa-pen-to-square"></span>
        <span>Mode édition</span>
        <span id="publishing">publier les changements</<span>
    </div>
    <div class="headerContainer">
        <h1 id="nav-home" class="nav-link">Sophie Bluel <span>Architecte d'intérieur</span></h1>
        <nav>
            <ul>
                <li id="nav-projects" class="nav-link">projets</li>
                <li id="nav-contact" class="nav-link">contact</li>
                <li id="nav-login" class="nav-link">login</li>
                <li id="nav-instagram" class="nav-link"><img src="./assets/icons/instagram.png" alt="Instagram"></li>
            </ul>
        </nav>
    </div>
    `;
    const logedIn = document.getElementById("nav-login");
    const editorOn = document.querySelector(".editorMod");
    const token=localStorage.getItem("token");
    if(token){
        logedIn.textContent="logout";
        editorOn.classList.remove("hidden");
    } else {
        logedIn.textContent="login";
        editorOn.classList.add("hidden");
    }
}

/* une fois connecter prévoire un logout a la place de login pour ce déconnecter */

function loadFooter(){
    document.querySelector("footer").innerHTML=`
    <nav>
		<ul>
			<li id="nav-cgu" class="nav-link">Mentions Légales</li>
		</ul>
	</nav>
    `;
}

function createNavigation () {
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
        const token=localStorage.getItem("token");
        if(token){
            localStorage.removeItem("token");
            window.location.href="./index.html";
        } else {
            window.location.href="./login.html";
        }
    }
}


function createCard (card, parent){
    const figure=document.createElement("figure")
    const img=document.createElement("img")
    const caption=document.createElement("figcaption")
    img.src=card.imageUrl
    img.alt=card.title
    caption.textContent=card.title
    figure.id=card.id
    figure.categoryId=card.categoryId
    figure.appendChild(img)
    figure.appendChild(caption)
    parent.appendChild(figure)
}

function createCards (data){
    const container=document.querySelector(".gallery")
    //console.log(data)
    data.map((card)=>{
        createCard(card, container)
    });
}

/*--- faire un bouton clickable, qui change de couleur et qui rend visible que la categories d'images associer au bouton ---*/

/*function createFilter (filter, parent){
    const span=document.createElement("span")
    
    span.id=filter.categoryId
    span.textContent=filter.category.name
    span.classList.add("btn");
    span.classList.add("disable");
    span.classList.add("filter");
    parent.appendChild(span)
}*/

function createFilters (data){
    //let tabCatId =[];
    //let tabCatName ="";
    const container=document.querySelector("#filters")
    
    /*console.log(data[0].categoryId)
    data.map((filter)=>{
        createFilter(filter, container)
    });*/

    container.innerHTML=`
        <span id="0" class="btn disable filter">Tous</span>
        <span id="${data[0].categoryId}" class="btn disable filter">${data[0].category.name}</span>
        <span id="${data[1].categoryId}" class="btn disable filter">${data[1].category.name}</span>
        <span id="${data[2].categoryId}" class="btn disable filter">${data[2].category.name}</span>
    `
}