import { editorPanel } from "../components/editorPanel.js"
import { modifyButton } from "../components/modifyIcon.js"
import { deleteWork, sendWork } from "./dataapi.js"
import { _closeModal, _openModal, closeModal, openModal } from "./modal.js"
import { loged } from "./script.js"

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
        //closeModal("#modal-gallery")
        _openModal("#modal-work-new-image")
    })

    const modalNew = document.querySelector("#modal-work-new-image")
    const previousBtn = modalNew.querySelector(".previous-modal")
    previousBtn.addEventListener("click", (e) => {
        _closeModal("#modal-work-new-image")
        //openModal("#modal-gallery")
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

    const modalBody = document.querySelector("#modal-gallery .actual-images"); // ici c'étais #modalgallery a la place du ${}
    modalBody.innerHTML=""

    

    // fill the modal
    const cards = document.querySelectorAll(".gallery figure")

    cards.forEach(card => {
        
        // get source image and title
        const inImg = card.querySelector("img")
        const inTitle = card.querySelector("figcaption")
        
        
        // out container for image and title
        const outFrame = document.createElement("div")
        outFrame.classList.add("previewpicture")
        
        // out image
        const outImg = document.createElement("img")
        outImg.src = inImg.src
        
        // edit button
        const outEditBtn = document.createElement("button") // ici cétait cette ligne : const outTitle = document.createElement("p")
        outEditBtn.textContent = "éditer" // ici cétait cette ligne : outTitle.textContent = inTitle.textContent
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
        outFrame.appendChild(outEditBtn) // ici cétait cette ligne : outFrame.appendChild(outTitle)
        modalBody.appendChild(outFrame)
    })
    
    _openModal("#modal-gallery") // ici c'étais #modalgallery a la place du ${}

}

// preview for add new image
const previewNoImg = document.getElementById("preview-no-image");
const previewImg = document.getElementById("preview-image");
const modalNewImage = document.getElementById("modal-work-new-image")
let newPreviewImgUrl = ""

modalNewImage.onchange = (e) => {
    const data = e.target.files[0]
    if(data.type === "image/jpeg" || data.type === "image/png" || data.type === "image/jpg") {
        //console.log("change", e.target.files[0])
        previewImg.src = URL.createObjectURL(data)
        newPreviewImgUrl = previewImg.src
        //console.log("verif url new image : " + previewImg.src)
        previewImg.classList.remove("hidden")
        previewNoImg.classList.add("hidden")
        return newPreviewImgUrl
    } else {
        console.log("not an image")
        previewImg.classList.remove("hidden")
        previewNoImg.classList.add("hidden")
    }
    
    console.log(e.target)
}

// récupération du titre et de la catégorie (quand cela fonctionnera, je devrais en faire une seule fonction qui fera les deux)
let Title = ""
let selectCategoryId = ""

function getTitle(){
    const Title = document.getElementById("select-title").value;
    return Title
}

function getCat() {
    const selectCategoryId = document.getElementById("category-id").value
    return selectCategoryId
}


// envoie de la nouvelle image dans la galerie

const submitNewImgBtn = document.querySelector(".btn-validate")

submitNewImgBtn.addEventListener("click", () => {
    const formData = new FormData()
    const titre = getTitle(Title)
    const category = getCat(selectCategoryId)

    formData.append("image", newPreviewImgUrl)
    formData.append("title", titre)
    formData.append("category", category)

    console.log("url image : " + newPreviewImgUrl)
    console.log("Titre :  " + titre)
    console.log("category :  " + category)

    for (const value of formData.entries())
    console.log(value[0], value,[1])

    //sendWork(formData)
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