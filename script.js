const apiKey = "86fc8cdd0b24a06d2f9b729902c65530";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

// Define a function to handle API request errors
function handleApiError(error) {
  console.error("API request error:", error);
  errorElement.style.display = "block";
  weatherElement.style.display = "none";
}

// Define a function to validate user input
function validateInput(input) {
  if (input.trim() === "") {
    return false;
  }
  return true;
}

// Define a function to get the weather icon URL based on the weather condition
function getWeatherIconUrl(weatherCondition) {
  const iconUrls = {
    Clouds: "img/clouds.png",
    Clear: "img/clear.png",
    Rain: "img/rain.png",
    Drizzle: "img/drizzle.png",
    Mist: "img/mist.png",
  };
  return iconUrls[weatherCondition];
}

async function checkWeather(city) {
  if (!validateInput(city)) {
    handleApiError("Invalid input");
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      handleApiError("City not found");
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      (data.wind.speed * 3.6).toFixed(2) + " km/h";

    const weatherCondition = data.weather[0].main;
    weatherIcon.src = getWeatherIconUrl(weatherCondition);

    weatherElement.style.display = "block";
    errorElement.style.display = "none";
  } catch (error) {
    handleApiError(error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather("London");
