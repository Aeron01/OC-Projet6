import { editorPanel } from "../components/editorPanel.js"
import { modifyButton } from "../components/modifyIcon.js"
import { deleteWork, sendWork } from "./dataapi.js"
import { _closeModal, _openModal, closeModal, openModal } from "./modal.js"
import { createCard, loged } from "./script.js"

export const initEdition = () => {

    const editorPnl = editorPanel()
    document.body.insertBefore(editorPnl, document.body.firstChild)
    editorPnl.id = "modifyEditor"

    const profile = document.querySelector("#introduction figure")
    const portfolio = document.querySelector("#portfolio h2")
    const modifyBtn = modifyButton("modifier", profile)
    const modifyBtnPort = modifyButton ("modifier", portfolio)
    modifyBtn.id = "modifyProfile"
    modifyBtnPort.id = "modifyPortfolio"

    // button "modify portfolio" onclick = open "edition modal"
    modifyBtnPort.addEventListener("click", (openModalEdition))

    // button "delete gallery"
    const trashGallery = document.querySelector(".gallery-suppress-btn")
    trashGallery.addEventListener("click", deleteGallery)

    // button add new project
    const addBtnNewProject = document.querySelector("#modal-gallery-add-work")
    addBtnNewProject.addEventListener("click", (e) => {
        console.log("add new project")
        _openModal("#modal-work-new-image")
    })

    const modalNew = document.querySelector("#modal-work-new-image")
    const previousBtn = modalNew.querySelector(".previous-modal")
    previousBtn.addEventListener("click", (e) => {
        _closeModal("#modal-work-new-image")
    })
}

export const enableEdition = () => {
    const editorPnl = document.getElementById("modifyEditor")
    const modifyBtn = document.getElementById("modifyProfile")
    const modifyBtnPort = document.getElementById("modifyPortfolio")
    modifyBtn.classList.add("editor-btn")
    modifyBtnPort.classList.add("editor-btn")
    modifyBtn.setAttribute("href","#modal-gallery")
    modifyBtnPort.setAttribute("href","#modal-gallery")
    
    if (loged()) {
        editorPnl.classList.remove("hidden")
        modifyBtn.classList.remove("hidden")
        modifyBtnPort.classList.remove("hidden")
    } else {
        editorPnl.classList.add("hidden")
        modifyBtn.classList.add("hidden")
        modifyBtnPort.classList.add("hidden")
    }  
}

// open modal
const openModalEdition = () => {
    // get modal body

    const modalBody = document.querySelector("#modal-gallery .actual-images");
    modalBody.innerHTML=""

    // fill the modal
    const cards = document.querySelectorAll(".gallery figure")

    cards.forEach(card => {
        
        // get source image and title
        const inImg = card.querySelector("img")
        const inTitle = card.querySelector("figcaption")
        
        
        // out container for image and title
        const outFrame = document.createElement("div")
        outFrame.classList.add("preview-picture")
        
        // out image
        const outImg = document.createElement("img")
        outImg.src = inImg.src
        
        // edit button
        const outEditBtn = document.createElement("button")
        outEditBtn.textContent = "éditer"
        outEditBtn.addEventListener("click",(e) => {
            console.log("edit project", inTitle.textContent)
        })
        
        // out container editor icons img
        const containerEdtrIcons = document.createElement("div")
        containerEdtrIcons.classList.add("img-editor-icons")
        
        // out trash can icon
        const trashCanIcon = document.createElement("span")
        trashCanIcon.classList.add("trash-img", "trash-icon","far", "fa-trash-can")
        trashCanIcon.addEventListener("click", async (e) => {
            const deleted = await deleteWork(card.id)
              if(deleted){
                console.log(`project ${card.id} deleted, inTitle.textcontent`)
                outFrame.remove()
                card.remove()
            } else {
                console.log(`project ${card.id} not deleted, inTitle.textcontent`)
            }
        })
        
        containerEdtrIcons.appendChild(trashCanIcon)
        outFrame.appendChild(containerEdtrIcons)
        outFrame.appendChild(outImg)
        outFrame.appendChild(outEditBtn)
        modalBody.appendChild(outFrame)
    })
    
    _openModal("#modal-gallery")
}

// preview for add new image
const previewNoImg = document.getElementById("preview-no-image");
const previewImg = document.getElementById("preview-image");
const modalInputImage = document.getElementById("modal-work-image")
let imageData = null

modalInputImage.onchange = (e) => {
    const data = e.target.files[0]
    if(data.type === "image/jpeg" || data.type === "image/png" || data.type === "image/jpg" || data.type === "image/webp") {

        if(data.size > 400000000){
            return alert("Image trop lourde !")
        }

        imageData = data
        
        previewImg.src = URL.createObjectURL(data)
        
        previewImg.classList.remove("hidden")
        previewNoImg.classList.add("hidden")
        document.querySelector(".container-add-img-btn").classList.add("hidden")
        document.querySelector(".container-add-img").style.padding = "0 0";
        
    } else {
        imageData = null
        console.log("not an image")
        previewImg.classList.remove("hidden")
        previewNoImg.classList.add("hidden")
        document.querySelector(".container-add-img-btn").classList.remove("hidden")
        document.querySelector(".container-add-img").style.padding = "10px 0";
    }
    
}

// récupération du titre et de la catégorie

function getTitle(){
    return document.getElementById("select-title").value;
    
}

function getCat() {
    return document.getElementById("category-id").value
    
}


// envoie de la nouvelle image dans la galerie

const submitNewImgBtn = document.getElementById("form-work-new-image")

submitNewImgBtn.addEventListener("submit", async (e) => {
    const titre = getTitle();
    const category = getCat();
    e.stopPropagation()
    e.preventDefault()

    if(titre.length<3) {
        alert("Titre trop court")
        return null
    } else if(category === undefined || category === null) {
        alert("Categorie non définie")
        return null
    } else if (!imageData) {
        alert("Pas d'image selectionner")
        return null
    }
    //document.querySelector(".btn-validate input").style.background = "#1D6154";
    

    const formData = new FormData();

    formData.append("image", imageData);
    formData.append("title", titre);
    formData.append("category", category);


    const result = await sendWork(formData)
    console.log(result)
    if(!result) {
        console.log("Something wrong")
        return null
    }
    console.log(result)
    createCard(result, document.querySelector(".gallery"))
    closeModal("#modal-work-new-image")
    closeModal("#modal-gallery")
})


// delete project
const deleteGallery = () => {
    console.log("delete gallery")
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML=""
    openModalEdition()
}




//let newImgUrl = document.getElementById("preview-image").getAttribute("src")

/* 
- faire en sorte que quand on quite l'ajout d'image, les choix et l'ajout d'image soit remise à zero.

- quand on clique su valider, cela doit ajouter à la galerie la nouvelle immage, avec son nom et sa categorie et l'afficher.

- quand on clique sur "publier", la nouvelle galerie est sauvegarder dans le backend.
*/