export function renderCountries(countries) {
    const container = document.getElementById("country-container");
    container.innerHTML = "";

    countries.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";

        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <p>${country.name.common}</p>
        `;

        container.appendChild(card);
    });
}
