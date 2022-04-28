const app = document.querySelector('.weatherApp');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const iconOutput = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city');


// add click event to each city in the panel

cities.forEach(function(city) {
  city.addEventListener('click', (e) => {
    // function that fetaches and displays all the data from the Weather API
    fetchWeatherData(e.target.innerHTML);
    // fadeout the app simple animation
    // app.style.opacity = "0";
  });
});

// add submit event to the form
form.addEventListener('submit', (e) => {
  // Prevents the default behaviour of the form
  e.preventDefault();
  // Throw an alert if the input field/search box is empty
  if (search.value === '') {
    alert('Please write in a city name');
  } else {
    // function that fetaches and displays all the data from the Weather API
    fetchWeatherData(search.value);
    // remove all text from the input field
    search.value = "";
    // fade out the app (simple animation)
    // app.style.opacity = "0";
  }
});

// function that returns a day of the week
function dayOfTheWeek(date) {
    const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
      ];
    return weekday[new Date(date).getDay()];
  };

// function that fetaches and displays all the data from the Weather API
function fetchWeatherData(cityInput) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=cef78a0702554ef3a2f92524222804&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      temp.innerHTML = data.current.temp_c + "°";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(date.substr(0,10))} ${d}, ${m} ${y}`;
    //   dateOutput.innerHTML = `${dayOfTheWeek(d,m,y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

      iconOutput.src = "./images/icons/" + iconId;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        app.style.backgroundImage = `url(./images/wallpaper/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#7ef8f8";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/wallpaper/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#7ef8f8";
        }

      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `
            url(./images/wallpaper/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        } else {
          app.style.backgroundImage = `url(./images/wallpaper/${timeOfDay}/snowy.jpg)`;
          btn.style.background = "#4d72aa";
          if (timeOfDay == "night") {
            btn.style.background = "#1b1b1b";
          }
        }
        app.style.opacity = "1";
      }
    })
    // .catch(err=>console.log(err));
    .catch((err) => {
        console.log(err.message);
  alert("City not found. Try again")
        app.style.opacity = "1";
      });
  }
  // Default city when the page loads
  fetchWeatherData('London');
  app.style.opacity = "1";

