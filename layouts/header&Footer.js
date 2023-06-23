import { loged } from "../script/script.js";

//funtion for loading the header
export function loadHeader(){
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

// function for loading the footer
export function loadFooter(){
    document.querySelector("footer").innerHTML=`
    <nav>
		<ul>
			<li id="nav-cgu" class="nav-link">Mentions Légales</li>
		</ul>
	</nav>
    `;
}