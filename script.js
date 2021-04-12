const API_KEY = "d099b88a065ae9e8a2a284b499d948e1";

const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("cities");

  if (localStorageData === null) {
    return [];
  } else {
    return JSON.parse(localStorageData);
  }
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDataByCityName = async (event) => {
  
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`;

    const data = await fetchData(url);
    console.log(data);

    const currentDayData = transformData(data);

    renderCurrentDayCard(currentDayData);
  }
};

const transformData = (data) => {
return {
  cityName: data.name,
  temperature: data.main.temp,
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  date: moment.unix(data.dt).format("MM-DD-YYYY"),
  iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
};
}

const onSubmit = async (event) => {
  event.preventDefault();

  const cityName = $("#city-input").val();
  //get cities array from local storage
  const cities = getFromLocalStorage();
  //push city name in to the array of cities
  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  renderCitiesFromLocalStorage();
  $("#city-input").val("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`;
  const data = await fetchData(url);

const currentDayData = transformData (data)

renderCurrentDayCard(currentDayData);
 
};

const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();
  //get cities from local storage
  const cities = getFromLocalStorage();

  const ul = $("<ul>").addClass(".list-group");

  const appendListItemToUl = (city) => {
    const li = $("<li>")
      .addClass(".list-group-item")
      .attr("data-city", city)
      .text(city);
    ul.append(li);
  };

  cities.forEach(appendListItemToUl);

  ul.on("click", getDataByCityName);

  $("#searched-cities").append(ul);
};


const renderCurrentDayCard = (data) => {
    $("#current-day").empty(); 

  const card = `<div class="card my-2">
                    <div class="card-body">
                        <h2>${data.cityName}(${data.date})<img src="${data.iconURL}"/></h2>
                        <div class="py-2">Temperature: ${data.temperature} &deg; C</div>
                        <div class="py-2">Humidity: ${data.humidity} % </div>
                        <div class="py-2">Wind Speed: ${data.windSpeed} MPH</div>
                        <div class="py-2">UV Index: </div>
                    </div>
                </div>`;

  $("#current-day").append(card);
};

const onReady = () => {
  renderCitiesFromLocalStorage();
  
};

$("#search-by-city-form").on("submit", onSubmit);

$(document).ready(onReady);
