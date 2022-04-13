//day and time 
function formatDate() {
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
};
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes =  `0${minutes}`;
}
document.querySelector("#day-time").innerHTML = `${day}, ${hour}:${minutes}`;
}

formatDate(); 


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
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML +   
  `
  <div class="col">
    <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>
    <img 
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
      alt="" 
      width="36"
      />
    <div class="weather-forecast-temp"> 
      <span class="weather-temp-max"> ${Math.round(forecastDay.temp.max)}° </span> 
      <span class="weather-temp-min"> ${Math.round(forecastDay.temp.min)}°  </span>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
let apiKey = "7b164cdced7aaeb17590e6fb8707df24";
let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayForecast);
}

function displayWeatherCondition (response) {
document.querySelector("#city-name").innerHTML = response.data.name;
document.querySelector("#weather").innerHTML = response.data.weather[0].description;
celsiusTemperature = response.data.main.temp;
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
document.querySelector("#humidity").innerHTML = response.data.main.humidity; 
document.querySelector("#wind").innerHTML = response.data.wind.speed;
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "7b164cdced7aaeb17590e6fb8707df24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let city = document.querySelector("#search-bar").value;
  search(city);
}

document.querySelector("#city-forms").addEventListener("submit", handleSubmit);

function displayLocation(position) {
document.querySelector("#city-name").innerHTML = `You are currently in ${position.data[0].name}, with coordinates ${position.data[0].lat}, ${position.data[0].lon}`;
search(position.data[0].name);
}

function searchLocation(position) {
let apiKey = "7b164cdced7aaeb17590e6fb8707df24";
let apiURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
axios.get(`${apiURL}`).then(displayLocation);
};

function updateCurrent(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
};

document.querySelector("#current-button").addEventListener("click", updateCurrent);


function displayFahrenheit(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

celsiusTemperature = null; 
let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsius);

search("Singapore"); 












