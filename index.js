const apiKey = "1e47a824af6ea3b064ff3db472a06563";

// Get data

let weatherData = (city) => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey
  )
    .then((res) => res.json())
    .then((data) => displayWeather(data));
};

const cityName = () => {
  let getCity = document.getElementById("search-bar").value;
  weatherData(getCity);

  document.getElementById("search-bar").value = "";
};

document.getElementById("search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    cityName();
  }
});

// Show data

const displayWeather = (data) => {
  if (data.cod == "200") {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed)

    document.querySelector(".city").innerHTML = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
  } else {
    alert("City not found");
  }
};

displayWeather(weatherData("Mexico"));
