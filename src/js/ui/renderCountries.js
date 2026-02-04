export function renderCountries(countries) {
    const container = document.getElementById("country-container");
    
    if (countries.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-globe-americas"></i>
                <h3>No countries to display</h3>
            </div>
        `;
        return;
    }
    
    container.innerHTML = "";

    countries.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";
        card.dataset.countryCode = country.cca3; // Store country code for reference

        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <p>${country.name.common}</p>
        `;

        // Add click event to open modal
        card.addEventListener('click', () => {
            // Dispatch custom event with country data
            const event = new CustomEvent('countryCardClicked', { detail: country });
            document.dispatchEvent(event);
        });

        container.appendChild(card);
    });
}