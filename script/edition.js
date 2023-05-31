import { editorPanel } from "../components/editorPanel.js"
import { modifyButton } from "../components/modifyIcon.js"
import { openModal } from "./modal.js"
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
    //document.querySelectorAll("modalgllery")
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", (e)=> {
            
            // debut partie ajouter
            let thisId = ""
            console.log(a.id)
            if(a.id == "modifyPortfolio") {
                console.log("id 1er nodal ok")
                thisId = "#modalgallery"
            
            //fin partie ajouter

            // get modal body
            const modalBody = document.querySelector("#modalgallery .actualimages"); // ici c'étais #modalgallery a la place du ${}
            // fill the modal
            const cards = document.querySelectorAll(".gallery figure")

            cards.forEach(card => {

                // get source image and title
                const inImg = card.querySelector("img")
                const inTitle = card.querySelector("figcaption")
                //console.log(inImg.src, inTitle.textContent)
                
                // out container for image and title
                const outFrame = document.createElement("div")
                outFrame.classList.add("previewpicture")

                // out image
                const outImg = document.createElement("img")
                outImg.src = inImg.src

                // out title
                const outTitle = document.createElement("p")
                outTitle.textContent = inTitle.textContent

                outFrame.appendChild(outImg)
                outFrame.appendChild(outTitle)
                modalBody.appendChild(outFrame)
            })
            }
            if(a.id == "addpicture") {
                console.log("id add ok")
                thisId = "#modalimg"
            }
            // open the modal
                openModal(e, `${thisId}`) // ici c'étais #modalgallery a la place du ${}
        })
    });
}
