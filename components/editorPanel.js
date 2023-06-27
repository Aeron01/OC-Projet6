import { modifyButton } from "./modifyIcon.js";

// function that creates the edit banner and edit buttons
export const editorPanel = (parent=null) => {
    const div = document.createElement("div");
    div.classList.add("editor-Mod", "hidden");
    modifyButton("Mode édition", div);
    
    const publishing =  document.createElement("span");
    publishing.textContent = "publier les changements";
    publishing.id = "publishing";
    div.appendChild(publishing);

    parent && parent.appendChild(div);

    return div;
}