document.getElementById("searchBtn").addEventListener("click", function () {
    let city = document.getElementById("cityInput").value;
    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data", error);
        document.getElementById("weatherInfo").innerText = "Failed fetching data. Try again";
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    if (data.temperature && data.wind && data.description && data.forecast) {
        weatherInfo.innerHTML = `
        <h2> Current Weather</h2>
        <p>Temperature: ${data.temperature}</p>
        <p>Wind: ${data.wind}</p>
        <p>Description: ${data.description}</p>
        <h3>Forecast</h3> 
        ${data.forecast.map(day => `
            <p> Day ${day.day}: Temperature: ${day.temperature}, Wind: ${day.wind}</p>`).join('')}
        `;
    } 
    else {
        weatherInfo.innerText = "Failed to fetch weather data. Please try again.";
    }
}