//day and time 
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

//temperature and city

function displayWeatherCondition (response) {
document.querySelector("#city-name").innerHTML = response.data.name;
document.querySelector("#weather").innerHTML = response.data.weather[0].description;
celsiusTemperature = response.data.main.temp;
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
document.querySelector("#humidity").innerHTML = response.data.main.humidity; 
document.querySelector("#wind").innerHTML = response.data.wind.speed;
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
  let apiKey = "7b164cdced7aaeb17590e6fb8707df24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}

document.querySelector("#city-forms").addEventListener("submit", handleSubmit);

function searchLocation(position) {
console.log(position);
let currentCity = "Singapore";
document.querySelector("#city-name").innerHTML = `You are currently in ${currentCity}, with coordinates ${position.coords.latitude}, ${position.coords.longitude}`;
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











