import { fetchCountries } from "./api/countryApi.js";
import { renderCountries } from "./ui/renderCountries.js";
import { setupPagination } from "./ui/pagination.js";

const ITEMS_PER_PAGE = 16;

async function initApp() {
    const countries = await fetchCountries();

    // Initial render (page 1)
    renderCountries(countries.slice(0, ITEMS_PER_PAGE));

    // Setup pagination automatically
    setupPagination(countries, ITEMS_PER_PAGE, renderCountries);
}

initApp();
