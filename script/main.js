window.onload=async ()=>{
    initToken();

    loadHeader();
    loadFooter();
    createNavigation();
    const[cats, data] = await Promise.all( [loadCategories(), loadData()]);
    createCards(data);
    createFilters(cats);
    loadCategoriesEventListener();
    initEdition();
    enableEdition();
}

