export const openModal = function (e, query) {
    e.preventDefault()
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

const elem = document.querySelector(".previousmodal")
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

elem.addEventListener("click", (e) => {
    console.log("test click")
    //closeModal(e, query)
    //openModal(e, query)
})