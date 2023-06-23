import { loadHeader, loadFooter } from "../layouts/header&Footer.js";
import { createNavigation, setToken } from "./script.js";

 

window.onload=async()=>{
    loadHeader();
    loadFooter();
    createNavigation();

    const form = document.querySelector("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email");
        const password = document.getElementById("password");
        const logError = document.querySelector(".login-error");
        logError.textContent = "";

        const user = {
            email: email.value,
            password: password.value
        };

        const options = {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        };
        
        fetch("http://localhost:5678/api/users/login",options)
        .then(result=>{
            if (!result.ok) {
                switch (result.status) {
                    case 404 : throw "Utilisateur non trouvé !";
                    case 401 : throw "Mot de passe erroné !";
                    default : throw "Erreur inattendue !";
                }
            }
            return result.json()
        })
        .then(result=> {
            if (!(result.token&&result.userId)) throw "Problème serveur !";         
            setToken(result.token, result.userId);
            window.location.href="./index.html";
        })
        .catch(err=> {
            logError.textContent=err;
        });
    }
}