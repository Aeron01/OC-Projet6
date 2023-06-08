import { enableEdition } from "./edition.js";

const grayBack = document.body.querySelector("graybackground")

export const openModal = function (e, query) {
    e.preventDefault()
    if(grayBack != "null") {
        document.body.classList.add("graybackground")
    }
    const modal = document.querySelector(query);
    modal.classList.remove("hidden");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("arial-modal", "true");
    function onCloseModal (e) {
        console.log(query)
        closeModal(e, query);
    }
    modal.onclick = onCloseModal;
    const btnClose = modal.querySelector(".js-modal-close");
    btnClose.onclick = onCloseModal;
    btnClose.focus();
    modal.querySelector(".js-modal-stop").onclick = stopPropagation;
}

/**
*   callback for close modal
*   return (Event) e
*   return(HTMLelement | string) query
*/

export const closeModal = function (e, query) {
    const modal = (typeof query === "string") ? document.querySelector(query) : query;
    if (!modal) return;
    e.preventDefault();
    if (grayBack != "null"){
        document.body.classList.remove("graybackground")
        document.body.attributes.removeNamedItem("class")
    }
    //console.log(modal)
    modal.classList.add("hidden");
    modal.setAttribute("arial-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.onclick=null;
    modal.querySelector(".js-modal-close").onclick= null;
    modal.querySelector(".js-modal-stop").onclick= null;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

/*const prevModal = function (e, query){
    e.preventDefault();
    console.log(query)
    //closeModal(e, query)
    //openModal(e, query)
}*/

window.addEventListener("keydown", function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        this.document.querySelectorAll(".modal").forEach(modal=>(e, modal))
    }
});

const PreviousModal = document.querySelector(".previousmodal")
const modifyImg = document.querySelector("#modifimg")
const trashImg = document.querySelector(".trash-img")
const trashGallery = document.querySelector(".gallerysupp")
/*export const prev = function (e, query) {
    //e.preventDefault()
    let test = 0
    elem.onclick=()=>{
        test+1
        console.log("click")
        return closeModal(e, query)
        //openModal("#modalgallery")
    }
}*/

PreviousModal.addEventListener("click", (e) => {
    console.log("test click fleche")
    console.log(enableEdition(prevModal))
    //closeModal(e, query)
    //openModal(e, query)
})

trashGallery.addEventListener("click", (e) => {
    console.log("test supp gallery")
    
})

// listener pour les icones "poubelle" et la modification dune image
window.onload=async => {
    modifyImg.addEventListener("click", (e) => {
        console.log("test modif img")
        //closeModal(e, query)
        //openModal(e, query)
    })

    trashImg.addEventListener("click", (e) => {
        console.log("test supp img")
    })
}
//