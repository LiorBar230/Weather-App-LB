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
}
function searchCity(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchCityTemp);
}
