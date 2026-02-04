import { fetchCountries } from "./api/countryApi.js";
import { renderCountries } from "./ui/renderCountries.js";
import { setupPagination } from "./ui/pagination.js";
import { setupCountryModal, showCountryDetails } from "./components/countryModal.js";
import { setupSearch } from "./ui/search.js";

const ITEMS_PER_PAGE = 16;
let allCountries = []; // Store all countries globally

async function initApp() {
    allCountries = await fetchCountries();

    // Initial render (page 1)
    renderCountries(allCountries.slice(0, ITEMS_PER_PAGE));

    // Setup pagination automatically
    setupPagination(allCountries, ITEMS_PER_PAGE, renderCountries);
    
    // Setup modal functionality
    setupCountryModal(allCountries);
    
    // Setup search functionality
    setupSearch(allCountries, renderCountries, setupPagination, ITEMS_PER_PAGE);
}

initApp();

// Export allCountries for use in other modules if needed
export { allCountries };