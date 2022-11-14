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
let nowDay = days[nowDateTime.getday()];
let nowHours = nowDateTime.getHours();
let nowMinutes = nowDateTime.getMinutes();
let currentDate = document.querySelector("div#currentDayAndTime");
currentDate.innerHTML = `${nowDay},${nowHours}:${nowMinutes}`;
function showSearchCityName(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("input#citySearchEngine");
  let cityNameDisplay = document.querySelector("h2#currentLocation");
  cityNameDisplay.innerHTML = `${searchCityName.value}`;
  searchCityName(searchCityName.value);
}
let citySearchEngine = document.querySelector("form#searchCity");
citySearchEngine.addEventListener("submit", showSearchCityName);

function showSearchCityTemp(response) {
  let currentTempDisplay = document.querySelector("div#currentTempDisplay");
  let temperature = Math.round(response, data, main.temp);
  currentTempDisplay.innerHTML = `${temperature}°`;
}
function searchCity(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchCityTemp);
}
