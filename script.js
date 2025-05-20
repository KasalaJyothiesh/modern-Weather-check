async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "98d3c793dbc27cd046655fc0909617bd";
  const resultDiv = document.getElementById("weather-result");

  if (!city) {
    resultDiv.innerHTML = `<p>❗ Please enter a city name.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p>⏳ Loading weather data...</p>`;

  // Try proxy to bypass CORS (for local/online editor use)
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const targetUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(
    city
  )}`;

  try {
    const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents); // AllOrigins wraps the content

    if (data.error) {
      resultDiv.innerHTML = `<p>❗ ${data.error.info}</p>`;
    } else {
      resultDiv.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${data.current.weather_icons[0]}" alt="icon" />
        <p><strong>${data.current.weather_descriptions[0]}</strong></p>
        <p>🌡️ ${data.current.temperature}°C (Feels like ${data.current.feelslike}°C)</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
        <p>🌬️ Wind: ${data.current.wind_speed} km/h</p>
        <p>🕓 Local Time: ${data.location.localtime}</p>
      `;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    resultDiv.innerHTML = `<p>❗ Unable to fetch weather. Check your connection or try again later.</p>`;
  }
}
