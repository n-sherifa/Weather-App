const form = document.getElementById("search-form");
const searchField = document.querySelector("input[type='search']");
const h1 = document.querySelector("#city");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const date = document.querySelector("#date");
const currentLocationBtn = document.querySelector("#current-location");

const apiKey = "0c60b44de21864bb56fa99961d3cdc57";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchField.value}&appid=${apiKey}&&units=metric`
    )
    .then(showWeather);
});

function showWeather(response) {
  h1.innerHTML = response.data.name;
  temp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  date.innerHTML = formatDate(new Date());
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

currentLocationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then(showWeather);
  });
});
