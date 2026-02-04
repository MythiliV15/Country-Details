export function showModal(country, weather) {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].official : "N/A";
    const symbol = country.currencies ? Object.values(country.currencies)[0].symbol : "N/A";
    const borders = country.borders ? country.borders.slice(-2).join(", ") : "No borders";

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <span class="close-x" id="close-x">&times;</span>
            <h2 style="text-align:center;">${country.name.common}</h2>
            <hr>
            <div class="details">
                <p><strong>Native Official:</strong> ${nativeName}</p>
                <p><strong>Currency Symbol:</strong> ${symbol}</p>
                <p><strong>Longitude:</strong> ${country.latlng[1]}</p>
                <p><strong>Last Borders:</strong> ${borders}</p>
            </div>
            <hr>
            <h3>Capital Weather (${country.capital ? country.capital[0] : 'N/A'})</h3>
            <div id="weather-info">
                ${weather ? `
                    <p><strong>Condition:</strong> ${weather.condition}</p>
                    <p><strong>Temp:</strong> ${weather.temp}°C (Feels like ${weather.realFeel}°C)</p>
                    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${weather.wind} km/h</p>
                    <p><strong>Time:</strong> ${weather.isDay ? "Day" : "Night"}</p>
                ` : `
                    <p style="color:red;">Weather data loading failed. <br> 
                    <small>Tip: Check if your API Key is correct or try using a VPN/CORS extension.</small></p>
                `}
            </div>
            <button class="modal-close-btn" id="close-btn">Close</button>
        </div>
    `;

    document.body.appendChild(modalOverlay);
    
    const close = () => modalOverlay.remove();
    document.getElementById("close-x").onclick = close;
    document.getElementById("close-btn").onclick = close;
}