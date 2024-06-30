document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '42ec1e621ca120bf23e7dede4a5115fc'; // Replace with your actual OpenWeatherMap API key

    async function getWeatherByCity(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            updateWeatherInfo(data);
            await getAQI(data.coord.lat, data.coord.lon); // Fetch AQI data

            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) {
                throw new Error('Forecast data not available');
            }
            const forecastData = await forecastResponse.json();
            updateForecast(forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayErrorMessage(error.message);
        }
    }

    async function getWeatherByCoordinates(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            updateWeatherInfo(data);
            await getAQI(lat, lon); // Fetch AQI data

            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) {
                throw new Error('Forecast data not available');
            }
            const forecastData = await forecastResponse.json();
            updateForecast(forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayErrorMessage(error.message);
        }
    }

    async function getAQI(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('AQI data not available');
            }
            const data = await response.json();
            updateAQI(data);
        } catch (error) {
            console.error('Error fetching AQI data:', error);
            displayErrorMessage(error.message);
        }
    }

    function updateWeatherInfo(data) {
        const locationElement = document.getElementById('location');
        const dateElement = document.getElementById('date');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('windSpeed');
        const weatherIconElement = document.getElementById('weatherIcon');

        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        dateElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconElement.src = iconUrl;
        weatherIconElement.alt = data.weather[0].description;
    }

    function updateAQI(data) {
        const aqiElement = document.getElementById('aqi');
        const aqi = data.list[0].main.aqi;
        let aqiText = '';

        switch (aqi) {
            case 1:
                aqiText = 'Good';
                break;
            case 2:
                aqiText = 'Fair';
                break;
            case 3:
                aqiText = 'Moderate';
                break;
            case 4:
                aqiText = 'Poor';
                break;
            case 5:
                aqiText = 'Very Poor';
                break;
            default:
                aqiText = 'Unknown';
        }

        aqiElement.textContent = `AQI: ${aqi} (${aqiText})`;
    }

    function updateForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; // Clear previous forecast

        const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyForecast.forEach(day => {
            const forecastDate = new Date(day.dt_txt);
            const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
            const date = forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const temp = `${Math.round(day.main.temp)}°C`;
            const description = day.weather[0].description;
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');

            forecastItem.innerHTML = `
                <p>${dayName}, ${date}</p>
                <img src="${iconUrl}" alt="${description}">
                <p>${temp}</p>
                <p>${description}</p>
            `;

            forecastContainer.appendChild(forecastItem);
        });
    }

    function displayErrorMessage(message) {
        const errorMessageElement = document.createElement('div');
        errorMessageElement.classList.add('error-message');
        errorMessageElement.textContent = message;
        document.body.appendChild(errorMessageElement);

        setTimeout(() => {
            errorMessageElement.remove();
        }, 5000);
    }

    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const locationInput = document.getElementById('locationInput').value;
        if (locationInput) {
            await getWeatherByCity(locationInput);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoordinates(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                getWeatherByCity('Indore');
            }
        );
    } else {
        getWeatherByCity('Indore');
    }
});
document.addEventListener("DOMContentLoaded", function () {
    function updateDateTime() {
        const now = new Date();
        const date = now.toDateString();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        document.getElementById('date').textContent = date;
        document.getElementById('time').textContent = time;
    }

    // Call the function to update date and time immediately
    updateDateTime();

    // Update date and time every minute
    setInterval(updateDateTime, 60000);
});

