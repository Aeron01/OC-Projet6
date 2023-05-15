function loadHeader(){
    document.querySelector("header").innerHTML=`
    <h1 id="nav-home" class="nav-link">Sophie Bluel <span>Architecte d'intérieur</span></h1>
	<nav>
		<ul>
			<li id="nav-projects" class="nav-link">projets</li>
			<li id="nav-contact" class="nav-link">contact</li>
			<li id="nav-login" class="nav-link">login</li>
            <li id="nav-logout" class="nav-link loginStat">logout</li>
			<li id="nav-instagram" class="nav-link"><img src="./assets/icons/instagram.png" alt="Instagram"></li>
		</ul>
	</nav>
    `;

    if (localStorage.length === 1) {
        console.log("connecter")
        const logedOut = document.getElementById("nav-logout");
        const logedIn = document.getElementById("nav-login");
        logedIn.classList.add("loginStat");
        logedOut.classList.remove("loginStat");
    } else {
        console.log("non connecter")
        const logedOut = document.getElementById("nav-logout");
        const logedIn = document.getElementById("nav-login");
        logedIn.classList.remove("loginStat");
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
        //{id:"nav-logout", link: "./login.html"},
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

}



function logout () {
    const logedOut = document.getElementById("nav-logout");
    logedOut.onclick=()=> {
        localStorage.removeItem("Ma clé");
        window.location.href="./index.html";
    }
}

/*function loadNav () {   
    document.querySelector("header h1").onclick= ()=>{
        window.location.href="./index.html"
    }
}*/