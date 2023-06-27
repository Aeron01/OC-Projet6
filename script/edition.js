import { editorPanel } from "../components/editorPanel.js";
import { modifyButton } from "../components/modifyIcon.js";
import { deleteWork, sendWork } from "./dataapi.js";
import { stopModal, startModal } from "./modal.js";
import { createCard, loged } from "./script.js";

export const initEdition = () => {

    const editorPnl = editorPanel();
    document.body.insertBefore(editorPnl, document.body.firstChild);
    editorPnl.id = "modifyEditor";

    const profile = document.querySelector("#introduction figure");
    const portfolio = document.querySelector("#portfolio h2");
    const modifyBtn = modifyButton("modifier", profile);
    const modifyBtnPort = modifyButton ("modifier", portfolio);
    modifyBtn.id = "modifyProfile";
    modifyBtnPort.id = "modifyPortfolio";

    // button "modify portfolio" onclick = open "edition modal"
    modifyBtnPort.addEventListener("click", (openModalEditor));

    // button "delete gallery"
    const trashGallery = document.querySelector(".gallery-suppress-btn");
    trashGallery.addEventListener("click", deleteGallery);

    // button add new project
    const addBtnNewProject = document.querySelector("#modal-gallery-add-work");
    addBtnNewProject.addEventListener("click", (e) => {
        resetModal();
        startModal("#modal-work-new-image");
    })

    const modalNew = document.querySelector("#modal-work-new-image");
    const previousBtn = modalNew.querySelector(".previous-modal");
    previousBtn.addEventListener("click", (e) => {        
        stopModal("#modal-work-new-image");
    })
}

export const enableEdition = () => {

    const editorPnl = document.getElementById("modifyEditor");
    const modifyBtn = document.getElementById("modifyProfile");
    const modifyBtnPort = document.getElementById("modifyPortfolio");
    modifyBtn.classList.add("editor-btn");
    modifyBtnPort.classList.add("editor-btn");
    modifyBtn.setAttribute("href","#modal-gallery");
    modifyBtnPort.setAttribute("href","#modal-gallery");
    
    if (loged()) {
        editorPnl.classList.remove("hidden");
        modifyBtn.classList.remove("hidden");
        modifyBtnPort.classList.remove("hidden");
    } else {
        editorPnl.classList.add("hidden");
        modifyBtn.classList.add("hidden");
        modifyBtnPort.classList.add("hidden");
    }  
}

// open the modal editor
const openModalEditor = () => {

    // get modal editor body
    const modalBody = document.querySelector("#modal-gallery .actual-images");
    modalBody.innerHTML="";

    // fill the modal editor
    const cards = document.querySelectorAll(".gallery figure");

    cards.forEach(card => {
        
        // get source image and title
        const inImg = card.querySelector("img");
        const inTitle = card.querySelector("figcaption");
        
        
        // out container for image and title
        const outFrame = document.createElement("div");
        outFrame.classList.add("preview-picture");
        
        // out image
        const outImg = document.createElement("img");
        outImg.src = inImg.src;
        
        // edit button
        const outEditBtn = document.createElement("button");
        outEditBtn.textContent = "éditer";
        outEditBtn.addEventListener("click",(e) => {
            console.log("edit project", inTitle.textContent);
        });
        
        // out container editor icons img
        const containerEdtrIcons = document.createElement("div");
        containerEdtrIcons.classList.add("img-editor-icons");
        
        // out trash can icon
        const trashCanIcon = document.createElement("span");
        trashCanIcon.classList.add("trash-img", "trash-icon","far", "fa-trash-can");
        trashCanIcon.addEventListener("click", async (e) => {
            const deleted = await deleteWork(card.id);
            if (deleted) {
            outFrame.remove();
            card.remove();
            }
        });
        
        modalBody.appendChild(outFrame);
        containerEdtrIcons.appendChild(trashCanIcon);
        outFrame.appendChild(containerEdtrIcons);
        outFrame.appendChild(outImg);
        outFrame.appendChild(outEditBtn);
    });
    
    startModal("#modal-gallery");
}

// preview of the new image to add
const previewNoImg = document.getElementById("preview-no-image");
const previewImg = document.getElementById("preview-image");
const modalInputImage = document.getElementById("modal-work-image");
let imageData = null;

modalInputImage.onchange = (e) => {
    const data = e.target.files[0];
    if (data.type === "image/jpeg" || data.type === "image/png" || data.type === "image/jpg" || data.type === "image/webp") {
        if (data.size > 400000000) {
            alert("Image trop lourde !");
            return;
        }
        showPreview(data);
    } else {
        alert("not an image");
        hidePreview();
    }
}

const hidePreview = () => {
    imageData = null;
    previewImg.classList.add("hidden");
    previewNoImg.classList.remove("hidden");
    document.querySelector(".container-add-img-btn").classList.remove("hidden");
    document.querySelector(".container-add-img").style.padding = "10px 0";
}

const showPreview = (data) => {
    imageData = data;
    previewImg.src = URL.createObjectURL(data);
    previewImg.classList.remove("hidden");
    previewNoImg.classList.add("hidden");
    document.querySelector(".container-add-img-btn").classList.add("hidden");
    document.querySelector(".container-add-img").style.padding = "0 0";
}

// reset add new picture modal
const resetModal = () => {
    hidePreview();
    document.getElementById("select-title").value = "";
    document.getElementById("category-id").value = "0";
    fieldsValidate();
}

// get title & the category info
function getFieldsInfo() {
    return {
        title: document.getElementById("select-title")?.value,
        categoryId: document.getElementById("category-id")?.value,
    }
}

// fields check test to activate the validate button
const fieldsValidate = () => {
    const button = document.querySelector(".btn-validate input");
    if (imageData === null || getFieldsInfo().title.length<3 || getFieldsInfo().categoryId === "0") {
        button.disabled = true;
    } else {    
        button.disabled = false;
    }
}

document.querySelector(".image-requester").onchange = fieldsValidate;

// send the new image in the gallery
const submitNewImgBtn = document.getElementById("form-work-new-image");

submitNewImgBtn.addEventListener("submit", async (e) => {
    const titre = getFieldsInfo().title;
    const categorie = getFieldsInfo().categoryId;
    e.stopPropagation();
    e.preventDefault();

    if (titre.length<3) {
        alert("Titre trop court");
        return null;
    } else if (categorie === undefined || categorie === null || categorie === "0") {
        alert("Catégorie non définie");
        return null;
    } else if (!imageData) {
        alert("Pas d'image selectionnée");
        return null;
    }
      
    const formData = new FormData();
    
    formData.append("image", imageData);
    formData.append("title", titre);
    formData.append("category", categorie);
    
    const result = await sendWork(formData);
    if (!result) return null;

    createCard(result, document.querySelector(".gallery"));
    stopModal("#modal-work-new-image");
    stopModal("#modal-gallery");
});


// delete the project
const deleteGallery = () => {
    if (confirm("Êtes vous sur de vouloir supprimer TOUTES la gallery ?")) {
    const gallery = document.querySelector(".gallery");
    const cards = [...gallery.querySelectorAll("figure")];
    cards.forEach(card => deleteWork(card.id))
    gallery.innerHTML="";
    openModalEditor();
    }
}
