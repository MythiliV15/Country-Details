import { fetchWeather } from '../api/weatherApi.js';

// Get modal element
const modal = document.getElementById("country-modal");
const weatherContainer = document.getElementById("modal-weather-details");

// Function to setup modal event listeners
export function setupCountryModal(countries) {
    // Listen for country card click events
    document.addEventListener('countryCardClicked', (event) => {
        showCountryDetails(event.detail, countries);
    });
    
    // Close modal when clicking on X button
    document.getElementById("modal-close-btn").addEventListener("click", closeModal);
    
    // Close modal when clicking on bottom close button
    document.getElementById("modal-bottom-close-btn").addEventListener("click", closeModal);
    
    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

// Function to display country details in modal
export async function showCountryDetails(country, allCountries) {
    // Show the modal first (loading state)
    modal.style.display = "block";
    weatherContainer.innerHTML = "<hr><p><i class='fas fa-spinner fa-spin'></i> Loading weather data...</p>";

    // 1. Basic Country Info
    document.getElementById("modal-country-name").textContent = country.name.common;
    document.getElementById("modal-country-flag").src = country.flags.png;
    document.getElementById("modal-country-flag").alt = country.name.common;
    document.getElementById("modal-official-name").textContent = country.name.official || "N/A";
    
    const capital = country.capital ? country.capital[0] : null;
    document.getElementById("modal-capital").textContent = capital || "N/A";
    
    // 2. Currency logic
    if (country.currencies) {
        const currencyCodes = Object.keys(country.currencies);
        const currencyList = currencyCodes.map(code => {
            const currency = country.currencies[code];
            return `${currency.name} (${currency.symbol || "No symbol"})`;
        }).join(", ");
        document.getElementById("modal-currency").textContent = currencyList || "N/A";
    } else {
        document.getElementById("modal-currency").textContent = "N/A";
    }
    
    // 3. Longitude and Borders
    document.getElementById("modal-longitude").textContent = country.latlng ? country.latlng[1] : "N/A";
    
    let borderNames = "N/A";
    if (country.borders && country.borders.length > 0) {
        const lastTwoBorders = country.borders.slice(-2);
        const borderCountryNames = lastTwoBorders.map(borderCode => {
            const borderCountry = allCountries.find(c => (c.cca3 === borderCode || c.cioc === borderCode));
            return borderCountry ? borderCountry.name.common : borderCode;
        });
        borderNames = borderCountryNames.join(", ");
    }
    document.getElementById("modal-borders").textContent = borderNames;

    // 4. Weather Integration
    if (capital) {
        const weather = await fetchWeather(capital);
        if (weather) {
            weatherContainer.innerHTML = `
                <hr>
                <div class="weather-header" style="display: flex; align-items: center; justify-content: space-between;">
                    <h4 style="margin: 10px 0;">Weather in ${capital}</h4>
                    <span>${weather.isDay ? '☀️ Day' : '🌙 Night'}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em;">
                    <p><strong>Condition:</strong> ${weather.condition}</p>
                    <p><strong>Temperature:</strong> ${weather.temp}°C</p>
                    <p><strong>RealFeel:</strong> ${weather.realFeel}°C</p>
                    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
                    <p><strong>Wind:</strong> ${weather.wind} km/h</p>
                </div>
            `;
        } else {
            weatherContainer.innerHTML = "<hr><p style='color: #666;'>Weather data currently unavailable.</p>";
        }
    } else {
        weatherContainer.innerHTML = "<hr><p>No capital found to fetch weather.</p>";
    }
}

function closeModal() {
    modal.style.display = "none";
    weatherContainer.innerHTML = "";
}