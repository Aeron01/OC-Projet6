async function loadFilter (data) {

let filters = document.querySelectorAll("#filters span");
let pictures = document.querySelectorAll("#portfolio figure");


//console.log(pictures)
    for(let filter of filters){
        filter.addEventListener("click", function(){
            let tag = parseInt(this.id);
            //filter.classList.add("active");
            for(let picture of pictures){              
                picture.classList.add("hidden");

                if (tag === picture.categoryId || tag === 0){
                    picture.classList.remove("hidden");
                }
            }
        });
    }
}