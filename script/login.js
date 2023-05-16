window.onload=async()=>{
    loadHeader();
    loadFooter();
    createNavigation();

    // je dois récuperer les valeur email et password qu'envois submit du bouton pour remplacer ceux de user
    const form = document.querySelector("form")
    form.onsubmit=(event)=> {
        event.preventDefault()
        const email=document.getElementById("login-email")
        const password=document.getElementById("password")
        const logError= document.querySelector(".loginError")
        logError.textContent="";


        //console.log(email)
        //console.log(password)
        const user={
            //email: 'sophie.bluel@test.tld', password: 'S0phie'
            email: email.value,
            password: password.value
        };

        const options={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        };
        
        
        fetch("http://localhost:5678/api/users/login",options)
        .then(result=>{
            if(!result.ok){
                switch (result.status) {
                    case 404 : throw "Utilisateur non trouvé !";
                    case 401 : throw "Mot de passe erroné !";
                    default : throw "Erreur inattendue !";
                }
            
            }
            return result.json()
        })
        .then(result=>{
            
            if (!(result.token&&result.userId)) throw "Problème serveur !"           
            localStorage.setItem("token",result.token);
            window.location.href="./index.html";
        })
        .catch(err=>{
            logError.textContent=err;
        });
    }
}