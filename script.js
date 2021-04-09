const citySearchForm = $("#city-search-form"); 
const cityInput = $("#searchInput");
const searchCityList = $("#search-city-list")


const onSubmit = (event) => {
    event.preventDefault();
  //console.log(onSubmit)
  const searchItems = cityInput.val(); 
  
};


  citySearchForm.on("submit", onSubmit);