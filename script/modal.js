let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusElement = null;

/*--- Partie en Ajax ---
const openModal = async function (e) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    if (target.startsWith('#')) {
         modal = document.querySelector(target)
    } else {
        modal = await loadModal(target)
    }
--- Fin de partie Ajax ---*/

export const openModal = async function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href")); // mettre en commentaire cette ligne pour passer en ajax
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusElement = document.querySelector(":focus");
    focusables[0].focus();
    modal.classList.remove("hidden");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("arial-modal", "true");
    modal.addEventListener("click",closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusElement !== null) previouslyFocusElement.focus();
    e.preventDefault();
    modal.classList.add("hidden");
    modal.setAttribute("arial-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click",closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"));

    if (e.shiftkey === true) {
        index--;
    } else {
        index++;
    }

    if(index >= focusables.length) {
        index = 0
    }

    if (index < 0) {
        index = focusables.length;
    }

    focusables[index].focus()
}

/*--- Partie en Ajax ---
//todo : afficher un loader
const loadModal = async function (url) {
    const target = '#' + url.split('#')[1]
    const exitingModal = document.querySelector(target)
    if (exitingModal !== null) return exitingModal
    const html = await fetch(url).then(response => response.text())
    const element = document.createRange().createContextualFragment(html).querySelector(target)
    if(element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
    document.body.append(element)
    return element
}
----------------------*/

/*document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
});*/

window.addEventListener("keydown", function (e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }

    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
});