const API_KEY = "d099b88a065ae9e8a2a284b499d948e1";

const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("cities");

  if (localStorageData === null) {
    return [];
  } else {
    return JSON.parse(localStorageData);
  }
};

//will work on this later
//const errorHandling =  () => {
//$("#").empty();

// const errorContainer = `<div class="callout alert grid-x">
// <h2 class="cell align-center-middle text-center">Error!</h2>
//<p class="cell align-center-middle text-center">
//  City not recognised. Please try again.</p>
//</div>`;
//$("#").append(errorContainer);
//}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    return alert("City not recognised. Please try again");
  } 
};


const getDataByCityName = async (event) => {
  
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");

   renderAllCards(cityName);
  }
};

const transformCurrentDayData = (data, name) => {
  const current = data.current
  return {
    cityName: name,
    temperature: current.temp,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
    date: moment.unix(current.dt).format("MM-DD-YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
    uvi: current.uvi
  };
};

const transformForecastData = (data) => {

return {
    date: moment.unix(data.dt).format("MM-DD-YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperature: data.temp.day,
    humidity: data.humidity, 
}
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

  renderAllCards(cityName)
 
};

const renderAllCards = async (cityName) => {

  const currentDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${API_KEY}`;

  const currentDayResponse = await fetchData(currentDayUrl);

  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentDayResponse.coord.lat}&lon=${currentDayResponse.coord.lon}&exclude=minutely,hourly&appid=${API_KEY}`;

  const forecastResponse = await fetchData(forecastUrl);

  const cardsData = forecastResponse.daily.map(transformForecastData);

  $("#forecast-cards-container").empty();

  cardsData.slice(1, 6).forEach(renderForecastCard);

  const currentDayData = transformCurrentDayData(forecastResponse, currentDayResponse.name);

  renderCurrentDayCard(currentDayData);
  
}

const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();
  //get cities from local storage
  const cities = getFromLocalStorage();

  const ul = $("<ul>").addClass("list-group");

  const appendListItemToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item")
      .attr("data-city", city)
      .text(city);
    ul.append(li);
  };

  cities.forEach(appendListItemToUl);

  ul.on("click", getDataByCityName);

  $("#searched-cities").append(ul);
};

const getUvIndexClass = (uvIndex) => {
  if(uvIndex > 2) {
    return "p-2 btn-primary";
  } else if(uvIndex < 2){
    return "p-2 btn-danger";
  } else {
    return ""; 
  }
}

const renderCurrentDayCard = (data) => {
    $("#current-day").empty(); 

  const card = `<div class="card my-2">
                <div class="card-body">
                <h2>${data.cityName} (${data.date}) <img src="${data.iconURL}" /></h2>
                <div class="py-2">Temperature: ${data.temperature} &deg;F</div>
                <div class="py-2">Humidity: ${data.humidity} % </div>
                <div class="py-2">Wind Speed: ${data.windSpeed} MPH</div>
                <div class="py-2">UV Index: <span class="${getUvIndexClass(data.uvi)}">${data.uvi}</span></div>
                </div>
                </div>`;

  $("#current-day").append(card);
  
};

const renderForecastCard = (data) => {

    const card = `<div class="card mh-100 bg-primary text-light rounded card-block">
                     <h5 class="card-title p-1">${data.date}</h5>
                     <img src="${data.iconURL}"/>
                     <h6 class="card-subtitle mb-2 text-light p-md-2 ">${data.temperature}&deg F</h6>
                     <h6 class="card-subtitle mb-2 text-light p-md-2 ">${data.humidity}%</h6>
                  </div>`;

    $("#forecast-cards-container").append(card);
    
}

const onReady = () => {
  renderCitiesFromLocalStorage();

  const resultOfLocalStorage = getFromLocalStorage()

  const cityName = resultOfLocalStorage[resultOfLocalStorage.length - 1]; 

  if(cityName) renderAllCards(cityName)
  
};

$("#search-by-city-form").on("submit", onSubmit);

$(document).ready(onReady);
