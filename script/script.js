let _loged = false;
function loged () {
    return _loged;
}
function initToken () {
    setToken(localStorage.getItem("token"));
}

function setToken (token) {
    _loged = !!token;
    if (!_loged) {
        localStorage.removeItem("token")
    } else {
        localStorage.setItem("token", token);
    }
}

/*export*/ function loadHeader(){
    document.querySelector("header").innerHTML=`
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
    logedIn.textContent= loged () ? "logout" : "login";
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
        if(loged()){
            setToken("");
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
    return figure;
}

function createCards (data){
    const container=document.querySelector(".gallery")
    //console.log(data)
    return data.map((card)=> createCard(card, container));
}

/*--- Générer de facon dynamique l'apparition du filtre ---*/

function createFilters (categories){
    
    categories.unshift({id:0, name:"Tous"});
    const container=document.querySelector("#filters")
    for (let categorie of categories) {
        const elem = document.createElement("span")
        elem.textContent = categorie.name;
        elem.id = categorie.id;
        elem.classList.add("btn", "filter");

        container.appendChild(elem);
        console.log(categorie)
    }

    selectCategory (container.querySelector("span"));
}