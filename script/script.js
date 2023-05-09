function loadHeader(){
    document.querySelector("header").innerHTML=`
    <h1 id="nav-home" class="nav-link">Sophie Bluel <span>Architecte d'intérieur</span></h1>
	<nav>
		<ul>
			<li id="nav-projects" class="nav-link">projets</li>
			<li id="nav-contact" class="nav-link">contact</li>
			<li id="nav-login" class="nav-link">login</li>
			<li id="nav-instagram" class="nav-link"><img src="./assets/icons/instagram.png" alt="Instagram"></li>
		</ul>
	</nav>
    `;
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
        {id:"nav-projects", link: "./projects.html"},
        {id:"nav-contact", link: "./contact.html"},
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

}

/*function loadNav () {   
    document.querySelector("header h1").onclick= ()=>{
        window.location.href="./index.html"
    }
}*/