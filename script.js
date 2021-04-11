const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#city-input").val();
  //get cities array from local storage
  const cities = getFromLocalStorage();
  //push city name in to the array of cities
  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  renderCitiesFromLocalStorage();
  $("#city-input").val("");
};

const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();
  //get cities from local storage
  const cities = getFromLocalStorage();

  const ul = $("<ul>").addClass(".list-group");

  const appendListItemToUl = (city) => {
    const li = `<li class="list-group-item">${city}</li>`;
    ul.append(li);
    $("#searched-cities").append(ul);

    console.log(city);
  };

  cities.forEach(appendListItemToUl);
};

const onReady = () => {
  renderCitiesFromLocalStorage();
};

$("#search-by-city-form").on("submit", onSubmit);
$(document).ready(onReady);
