async function loadFilter () {

/*const all=document.getElementById("all");
const object=document.getElementById("object");
const appartment=document.getElementById("appartment");
const hostelResto=document.getElementById("hostel&Resto");*/

let filters = document.querySelectorAll("#filters span")
    for(let filter of filters){
        filter.addEventListener("click", function(){
            let tag = this.id;

            let pictures = document.querySelectorAll("#gallery figure")
            for(let picture of pictures){
                picture.classList.add("hidden")

                if (tag in picture.dataset || tag === "all"){
                    picture.classList.remove("hidden")
                }
            }
        });
    }
}