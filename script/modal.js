let modal_Path = []


/**
 * 
 * @param {string|HTMLElement} query 
 */

export const openModal = function (query) {
    if (modal_Path.length>0) {
        _closeModal(modal_Path[modal_Path.length-1])
    }
    modal_Path.push(query)
    console.log(modal_Path)

    _openModal(query)
}

export const closeModal = function (query) {
    if (modal_Path.length>1 && modal_Path[modal_Path.length-1] === query) {
        _openModal(modal_Path[modal_Path.length-2])
    }
    modal_Path.splice(indexOffEnd(modal_Path, query), 1)

    _closeModal(query)
}

const indexOffEnd = (arr, query) => {
    for (let i = arr.length -1; i >= 0; i--) {
        if (arr[i] === query) {
            return i
        }
    }
    return -1
}

/**
 *   callback for close modal
 *   return (Event) e
 *   return(HTMLelement | string) query
*/

export const _closeModal = function (query) {
    const modal = (typeof query === "string") ? document.querySelector(query) : query;
    if (!modal) return;
    
    //console.log(modal)
    modal.classList.add("hidden");
    modal.setAttribute("arial-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.onclick=null;
    modal.querySelector(".js-modal-close").onclick= null;
    modal.querySelector(".js-modal-stop").onclick= null;
}

export const _openModal = function (query) {

    const modal = document.querySelector(query);
    modal.classList.remove("hidden");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("arial-modal", "true");
    function onCloseModal (e) {
        console.log(query)
        e.preventDefault()
        e.stopPropagation()
        closeModal(query);
    }
    modal.onclick = onCloseModal;
    const btnClose = modal.querySelector(".js-modal-close");
    btnClose.onclick = onCloseModal;
    btnClose.focus();
    modal.querySelector(".js-modal-stop").onclick = stopPropagation;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

window.addEventListener("keydown", function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        const allModals = document.querySelectorAll(".modal")
        allModals.forEach(modal=>(closeModal(modal)))
    }
});

