import { loadHeader, loadFooter } from "../layouts/header&Footer.js";
import { createNavigation, createCards, createFilters, initToken, createSelectCats } from "./script.js";
import { loadCategoriesEventListener } from "./filter.js";
import { initEdition, enableEdition } from "./edition.js";
import { loadCategories, loadData } from "./dataapi.js";

window.onload=async ()=>{
    initToken();
    loadHeader();
    loadFooter();
    createNavigation();
    const[cats, data] = await Promise.all( [loadCategories(), loadData()]);
    createCards(data);
    createFilters(cats);
    loadCategoriesEventListener();
    createSelectCats(cats);
    initEdition();
    enableEdition();
}
