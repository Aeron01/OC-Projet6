window.onload=async()=>{
    loadHeader();
    loadFooter();
    createNavigation();
    logout();

    // je dois récuperer les valeur email et password qu'envois submit du bouton pour remplacer ceux de user
    const form = document.querySelector("form")
    form.onsubmit=async (event)=> {
        event.preventDefault()
        const email=document.getElementById("login-email")
        const password=document.getElementById("password")
        
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
        
        const result=await fetch("http://localhost:5678/api/users/login",options)
        .then(result=>{return result.json()});
        console.log(result);
        console.log("token:"+result.token);
        console.log("user ID:"+result.userId);


        localStorage.setItem("Ma clé",result.token);
        const myToken=localStorage.getItem("Ma clé");
        console.log(myToken);
        window.location.href="./projet.html";
    }
}