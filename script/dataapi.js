const HOST = "http://localhost:5678/"
const API = HOST + "api/"

/**
 * get works from API
 * @returns {Promise<Array<works>>}
 */
async function loadData(){
    return await fetch(`${API}works`)
    .then(response=>{
        if(!response.ok) throw "données non reçues !"
        
        return response
        
    })

    .then(response=>response.json())

    .catch(err=>{
        console.log(err)
        return []
    })
}

/**
 * get categories from API
 * @returns {Promise<Array<Categorie>>}
 */
async function loadCategories(){
    return await fetch(`${API}categories`)
    .then(response=>{
        if(!response.ok) throw "données non reçues !"
        
        return response
        
    })

    .then(response => response.json())

    .catch(err=>{
        console.log(err)
        return []
    })
}