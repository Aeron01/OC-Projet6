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
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", (e)=> {
            // get modal body
            const modalBody = document.querySelector("#modalgallery .previewpictures");

            // fill the modal
            const cards = document.querySelectorAll(".gallery figure")

            cards.forEach(card => {

                // get source image and title
                const inImg = card.querySelector("img")
                const inTitle = card.querySelector("figcaption")
                console.log(inImg.src, inTitle.textContent)
                
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
            // open the modal
            openModal(e, "#modalgallery")
        })
    });
}
