import { editorPanel } from "../components/editorPanel.js"
import { modifyButton } from "../components/modifyIcon.js"
import { closeModal, openModal } from "./modal.js"
import { loged } from "./script.js"

let thisId = ""
let prevModal = ""

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
}

export const enableEdition = () => {
    const editorPnl = document.getElementById("modifyEditor")
    const modifyBtn = document.getElementById("modifyProfile")
    const modifyBtnPort = document.getElementById("modifyPortfolio")
    modifyBtn.classList.add("editor", "js-modal")
    modifyBtnPort.classList.add("editor", "js-modal")
    modifyBtn.setAttribute("href","#modalgallery")
    modifyBtnPort.setAttribute("href","#modalgallery")
    
    if (loged()) {
        editorPnl.classList.remove("hidden")
        modifyBtn.classList.remove("hidden")
        modifyBtnPort.classList.remove("hidden")
    } else {
        editorPnl.classList.add("hidden")
        modifyBtn.classList.add("hidden")
        modifyBtnPort.classList.add("hidden")
    }
    //document.querySelectorAll("modalgallery")
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", (e)=> {
            
            // debut partie ajouter
            console.log(a.id)
            if(a.id === "modifyPortfolio") {
                //console.log("id 1er nodal ok")
                thisId = "#modalgallery"
                prevModal = thisId
                //fin partie ajouter
                
                // get modal body
                const modalBody = document.querySelector("#modalgallery .actualimages"); // ici c'étais #modalgallery a la place du ${}
                // fill the modal
                const cards = document.querySelectorAll(".gallery figure")
                
                cards.forEach(card => {
                    
                    // get source image and title
                    const inImg = card.querySelector("img")
                    //const inTitle = card.querySelector("figcaption")
                    //console.log(inImg.src, inTitle.textContent)
                    
                    // out container for image and title
                    const outFrame = document.createElement("div")
                    outFrame.classList.add("previewpicture")
                    
                    // out image
                    const outImg = document.createElement("img")
                    outImg.src = inImg.src
                    
                    // out title
                    const outTitle = document.createElement("p")
                    outTitle.textContent = "éditer" // ici cétait cette ligne outTitle.textContent = inTitle.textContent
                    outTitle.setAttribute("href","#modalimg")
                    outTitle.setAttribute("id", "modifimg")
                    outTitle.classList.add("js-modal")
                    
                    // out container editor icons img
                    const containerEdtrIcons = document.createElement("div")
                    containerEdtrIcons.classList.add("img-editor-icons")
                    
                    // out trash can icon
                    const trashCanIcon = document.createElement("span")
                    trashCanIcon.classList.add("trash-img", "trash-icon","far", "fa-trash-can")
                    
                    containerEdtrIcons.appendChild(trashCanIcon)
                    outFrame.appendChild(containerEdtrIcons)
                    outFrame.appendChild(outImg)
                    outFrame.appendChild(outTitle)
                    modalBody.appendChild(outFrame)
                })
            }
            
            if(a.id === "addpicture") {
                //console.log("id add ok")
                thisId = "#modalimg"
                closeModal(e, "#modalgallery")
                /*let galleryHidden = document.getElementById("#modalgallery")
                galleryHidden.classList.add("hidden")*/
            }
            console.log(thisId)
            // open the modal
                openModal(e, `${thisId}`) // ici c'étais #modalgallery a la place du ${}
                console.log(`prec modal : ${prevModal}`)
            return prevModal
        })
    });

}
/* 
- faire en sorte que la précédente modal disparaise à l'ouverture de la précédente et
qu'en cliquant sur la flèche cela ferme la modal actuelle et fasse réaparaitre la modal
précédente

- récupérés les id et noms des catégories pour s'en servir dans le menu déroulant

- récupére une image à partir du backend et l'afficher
*/