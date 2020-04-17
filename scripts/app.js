const notification = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp span");
const locationElement = document.querySelector(".location");
const searchBtn = document.getElementById("searchBtn");
const date = document.querySelector(".date");
var my_time = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
date.innerHTML = `  ${day[my_time.getDay()]}, ${my_time.getDate()} ${
  month[my_time.getMonth()]
} ${my_time.getFullYear()} `;
// Api constants & APi Key
const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

const weather = {
  temperature: {
    value: 5,
    unit: "celsius",
  },
  description: "few clouds",
  iconID: "04n",
  city: "London",
  country: "UK",
};
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconID}.png" width="64px" />`;
  tempElement.innerHTML = `${weather.temperature.value}&deg;`;
  locationElement.innerHTML = `${weather.city}`;
}

function celsiusToFahrenhite(temperature) {
  //(0°C × 9/5) + 32 = 32°F
  return (temperature * 9) / 5 + 32;
}

//Notification Error or geolocator support
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const searchQuery = document.getElementById("search").value;
  if ("geolocation" in navigator) {
    getWeather(searchQuery);
  } else {
    notification.style.display = "block";
    notification.innerHTML = "Browser Doesn't Support Geolocation.";
  }
});

function getWeather(search) {
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.temperature.unit = "celsius";
      weather.city = data.name;
      weather.iconID = data.weather[0].icon;
      displayWeather();
    })
    .catch(function () {
      alert("City not found");
    });
}

//Event Listeners
tempElement.addEventListener("click", function () {
  tempElement.style.cursor = "pointer";
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit === "celsius") {
    let fahrenhite = celsiusToFahrenhite(weather.temperature.value);
    fahrenhite = Math.floor(fahrenhite);
    tempElement.innerHTML = `${fahrenhite} &deg <span>F</span>`;
    weather.temperature.unit = "fahrenhite";
  } else {
    tempElement.innerHTML = `${weather.temperature.value} &deg <span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
