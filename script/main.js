window.onload=async ()=>{
    loadHeader();
    loadFooter();
    createNavigation();
    const data = await loadData();
    createCards(data);
}