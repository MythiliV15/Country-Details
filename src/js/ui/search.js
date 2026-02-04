let currentSearchQuery = '';
let searchTimeout = null;

// Function to setup search functionality
export function setupSearch(allCountries, renderCountries, setupPagination, itemsPerPage) {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchResultsInfo = document.getElementById('search-results-info');

    // Real-time search with debouncing
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        currentSearchQuery = query;
        
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Set a new timeout for debouncing (300ms delay)
        searchTimeout = setTimeout(() => {
            performSearch(query, allCountries, renderCountries, setupPagination, itemsPerPage, searchResultsInfo);
        }, 300);
    });

    // Clear search functionality
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        clearSearchBtn.style.visibility = 'hidden';
        
        // Clear search results info
        searchResultsInfo.textContent = '';
        
        // Reset to show all countries with pagination
        renderCountries(allCountries.slice(0, itemsPerPage));
        setupPagination(allCountries, itemsPerPage, renderCountries);
    });

    // Show/hide clear button based on input
    searchInput.addEventListener('input', () => {
        clearSearchBtn.style.visibility = searchInput.value.length > 0 ? 'visible' : 'hidden';
    });

    // Initialize clear button visibility
    clearSearchBtn.style.visibility = 'hidden';
}

// Function to perform the search
function performSearch(query, allCountries, renderCountries, setupPagination, itemsPerPage, searchResultsInfo) {
    if (!query) {
        // If query is empty, show all countries with pagination
        renderCountries(allCountries.slice(0, itemsPerPage));
        setupPagination(allCountries, itemsPerPage, renderCountries);
        searchResultsInfo.textContent = '';
        return;
    }

    // Filter countries based on search query
    const filteredCountries = allCountries.filter(country => {
        // Search in common name
        const commonName = country.name.common.toLowerCase();
        // Search in official name
        const officialName = country.name.official.toLowerCase();
        
        return commonName.includes(query) || officialName.includes(query);
    });

    // Display search results info
    if (filteredCountries.length === 0) {
        searchResultsInfo.innerHTML = `<i class="fas fa-search"></i> No countries found for "${query}"`;
    } else {
        searchResultsInfo.textContent = `Found ${filteredCountries.length} country${filteredCountries.length !== 1 ? 's' : ''} matching "${query}"`;
    }

    if (filteredCountries.length > 0) {
        // Show all search results at once (no pagination for search results)
        renderCountries(filteredCountries);
        
        // Clear pagination for search results
        document.getElementById('pagination').innerHTML = '';
        
        // Add a "View All" option if there are many results
        if (filteredCountries.length > itemsPerPage) {
            const paginationDiv = document.getElementById('pagination');
            const allButton = document.createElement('button');
            allButton.textContent = `View All (${filteredCountries.length})`;
            allButton.className = 'active';
            allButton.disabled = true;
            paginationDiv.appendChild(allButton);
        }
    } else {
        // Display "no results" message in the country container
        const container = document.getElementById('country-container');
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-globe-americas"></i>
                <h3>No countries found</h3>
                <p>No countries match "${query}"</p>
                <p>Try searching with a different term</p>
            </div>
        `;
        
        // Clear pagination
        document.getElementById('pagination').innerHTML = '';
    }
}

// Function to get current search query (for external use if needed)
export function getCurrentSearchQuery() {
    return currentSearchQuery;
}