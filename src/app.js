let nowDateTime = new Date();
nowDateTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let nowDay = days[nowDateTime.getDay()];
let nowHours = nowDateTime.getHours();
if (nowHours < 10) {
  nowHours = `0${nowHours}`;
}
let nowMinutes = nowDateTime.getMinutes();
if (nowMinutes < 10) {
  nowMinutes = `0${nowMinutes}`;
}
let currentDate = document.querySelector("div#currentDayAndTime");
currentDate.innerHTML = ` Last updated: ${nowDay},${nowHours}:${nowMinutes}`;
function showSearchCityName(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("input#citySearchEngine");
  let cityNameDisplay = document.querySelector("h2#currentLocation");
  cityNameDisplay.innerHTML = `${searchCityName.value}`;
  searchCity(searchCityName.value);
}
let citySearchEngine = document.querySelector("form#searchCity");
citySearchEngine.addEventListener("submit", showSearchCityName);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <span>
              <span class="day">${formatDay(forecastDay.dt)}</span>
              <img
                id="weatherImage-Day"
                class="weatherImage-Week"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="clear"
                id="icon"
              />
              <span class="highTemp"> ${Math.round(
                forecastDay.temp.max
              )}°/</span>
              <span class="lowTemp"> ${Math.round(forecastDay.temp.min)}°</span>
            </span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showSearchCityTemp(response) {
  let currentTempDisplay = document.querySelector("strong#temperature");
  let temperature = Math.round(response.data.main.temp);
  let currentHumidityDisplay = document.querySelector("span#currentHumidity");
  let humidity = Math.round(response.data.main.humidity);
  let currentWindDisplay = document.querySelector("span#currentWind");
  let wind = Math.round(response.data.wind.speed);
  let tempMinDisplay = document.querySelector("span#currentLowTemp");
  let minTemp = Math.round(response.data.main.temp_min);
  let tempHighDisplay = document.querySelector("span#currentHighTemp");
  let tempHigh = Math.round(response.data.main.temp_max);
  let currentConditionsDisplay = document.querySelector(
    "div#currentConditions"
  );
  let condition = response.data.weather[0].description;
  let weatherIcon = document.querySelector("img#icon");
  celsiusTemp = Math.round(response.data.main.temp);
  minCelsiusTemp = Math.round(response.data.main.temp_min);
  maxCelsiusTemp = Math.round(response.data.main.temp_max);
  currentTempDisplay.innerHTML = `${temperature}`;
  currentHumidityDisplay.innerHTML = `Humidty:${humidity}% `;
  currentWindDisplay.innerHTML = `Wind:${wind} Km/H`;
  tempMinDisplay.innerHTML = `${minTemp}°`;
  tempHighDisplay.innerHTML = `${tempHigh}°/`;
  currentConditionsDisplay.innerHTML = `${condition}`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchCityTemp);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("strong#temperature");
  let minTempDisplay = document.querySelector("span#currentLowTemp");
  let minFarenheitTemp = Math.round((minCelsiusTemp * 9) / 5 + 32);
  let maxTempDisplay = document.querySelector("span#currentHighTemp");
  let maxFarenheitTemp = Math.round((maxCelsiusTemp * 9) / 5 + 32);
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureDisplay.innerHTML = Math.round(farenheitTemp);
  maxTempDisplay.innerHTML = `${maxFarenheitTemp}°/ `;
  minTempDisplay.innerHTML = `${minFarenheitTemp}°`;
  celsiusLink.classList.remove("active-link");
  farenheitLink.classList.add("active-link");
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("strong#temperature");
  let minTempDisplay = document.querySelector("span#currentLowTemp");
  let maxTempDisplay = document.querySelector("span#currentHighTemp");
  temperatureDisplay.innerHTML = celsiusTemp;
  maxTempDisplay.innerHTML = `${maxCelsiusTemp}°/ `;
  minTempDisplay.innerHTML = `${minCelsiusTemp}°`;
  farenheitLink.classList.remove("active-link");
  celsiusLink.classList.add("active-link");
}
let celsiusTemp = null;
let minCelsiusTemp = null;
let maxCelsiusTemp = null;
let farenheitLink = document.querySelector("a#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);
let celsiusLink = document.querySelector("a#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Washington");
