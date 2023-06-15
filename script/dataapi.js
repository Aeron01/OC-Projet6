import { getAuth, setToken } from "./script.js"

const HOST = "http://localhost:5678/"
const API = HOST + "api/"

/**
 * get works from API
 * @returns {Promise<Array<works>>}
 */
export async function loadData(){
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
export async function loadCategories(){
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


export async function deleteWork (id) {
    
    console.log("delete project", id)
    const auth = getAuth()
    
    const option = {
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + auth.token
        },
        method:"DELETE",
        body: JSON.stringify({userId: auth.userId})
    }

    return await fetch(`${API}works/${id}`, option)
    
    .then(response=>{

        if (!authentified(response)) return false

        if(!response.ok) {
            if(response.status === 500) {
             console.log("server error")
            }
            return false   
        }

        if(response.status === 200) return true
        if(response.status === 204) return true
        return false
    })

    .catch(err=>{
        console.log(err)
        return false
    })

}

/**
 * 
 * @param {Response} response 
 * @returns {boolean}
 */
function authentified (response) {
    if(response.status === 401) {
        alert("user not authentified - redirect to login page")
        setToken(undefined,undefined)
        window.location.href="./login.html"
        return false
    }
    
    return true
}


// send the project (not good for now)
export async function sendWork (formData) {
    
    const auth=getAuth()
    return fetch('http://localhost:5678/api/works/', {
        method: "POST",
        headers: {
            "authorization": "Bearer " + auth.token
            
        },
        body: formData
    })
    
    .then(async (response)=>{

        if (!authentified(response)) return null

        if(response.status === 500) {
            throw new Error ("Server error")
        } else if (response.status === 400) {
            throw new Error ("Bad Request")
        }
        if(!response.ok) {
            throw new Error ("Unknow error")
        }
        if(response.status === 201) {
            return await response.json()
        }
        return null

    })

    .catch(err=>{
        console.log(err)
        return null
    })

}
