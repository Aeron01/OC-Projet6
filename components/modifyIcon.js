const modifyIcon = () => {
    const elem = document.createElement("span")
    elem.classList.add("far", "fa-pen-to-square", "js-modal")
    elem.setAttribute("href","#modalgallery")
    return elem
}

export const modifyButton = (name, parent=null) => {
    const div = document.createElement("div")
    const nameElement = document.createElement("span")
    nameElement.textContent = name

    div.appendChild(modifyIcon())
    div.appendChild(nameElement)

    parent && parent.appendChild(div)

    return div;
}