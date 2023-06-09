import { modifyButton } from "./modifyIcon.js"

export const editorPanel = (parent=null) => {
    const div = document.createElement("div")
    div.classList.add("editorMod", "hidden")
    modifyButton("Mode édition", div)
    
    const publishing =  document.createElement("span")
    publishing.textContent = "publier les changements"
    publishing.id = "publishing"
    div.appendChild(publishing)

    parent && parent.appendChild(div)

    return div;
}