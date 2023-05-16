async function loadData(){
    return await fetch("http://localhost:5678/api/works")
    .then(response=>{
        if(!response.ok){
            throw "données non reçues !"
        }
        return response.json()
        
    })
    .then(data=>{
        console.log(data)
        return data
    })
    .catch(err=>{
        console.log(err)
        return []
    })
}