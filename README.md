# Weather Dashboard

## Description 

I was challenged to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS. I was tasked to retrieving data from weather API and use it in the context such that on search of a specific city, as a result the current weather as well 5 day weather forecast is rendered on the main page. 

Here's a quick summary of what I did:

- Use the OpenWeather API to retrieve weather data for cities for current day weather conditions. 
- Use OpenWeather One Call APIl for lag, lon to fetch 5 day weather forecast.
- Dynamically build cards and lists using jquery.
- created a weather dashboard with form inputs in javascript. 
- Upon search for a city the user is presented with current and future conditions for that city and that city is added to the search history.
- Used local storage to persist the searched data. 
- Created current weather conditions card with with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. 
- Used moment.js to get current date.
- Added color coding to UV index that indicates whether the conditions are favorable, moderate, or severe. 
- Created a 5-day forecast dynamically in javascript that displays the date, an icon representation of weather conditions, the temperature, and the humidity. 
- Added logic such that on click on a city in the search history,
the user again is presented with current and future conditions for that city. 
- Used methods like forEach, map, slice. 
- Used async-await function. 

## Future Improvements 

If i had more time, I would add an error handling function. If a user enters a wrong city name this function can handle it by throwing a error message for a better user experience. 
I would also use modal to for the error message.
Refactor some of the code
Use more of CSS framework to make the application look more visually appealing.

## Screenshots

![]()
![]()

## Link To Deployed Application 

https://nrasool21.github.io/weather-dashboard/