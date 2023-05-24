import { editorPanel } from "../components/editorPanel.js"
import { modifyButton } from "../components/modifyIcon.js"
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
    modifyBtnPort.classList.add("editor")

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