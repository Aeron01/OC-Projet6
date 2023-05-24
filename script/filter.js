export function loadCategoriesEventListener () {

    let categorieElements = document.querySelectorAll("#filters span");
    
    
    
    for(let categoryElement of categorieElements){
        categoryElement.addEventListener("click", (ev)=>selectCategory(ev.target));
    }
}


export function selectCategory (categorieElement){

    let categorieElements = document.querySelectorAll("#filters span");
    for(let categorieElement of categorieElements){
        categorieElement.classList.remove("enable");
    }
    categorieElement.classList.add("enable");

    let pictures = document.querySelectorAll("#portfolio figure");
    let tag = +categorieElement.id;
            
    for(let picture of pictures){              
        picture.classList.add("hidden");

        if (tag === picture.categoryId || tag === 0){
            picture.classList.remove("hidden");
        }
    }
}

