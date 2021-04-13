# AnyWeather web app:

AnyWeather is a web app I developed that can calculate the weather for any coordinate on the planet. I used the OpenWeather API to get all the weather information for a certain location using the latitude and longitude values. I also used the Leaflet map library to render a world map on the page and make it  possible for the user to get the latitude and longitude values by just clicking on the map. The app was developed using React.

I developed this web app for people that like to travel to remote areas, mountain regions with high altitude or for people that just want a list of certain locations’ temperature all in one place. The map shows mountain peaks with their elevation in meters, hiking trails and nature/wildlife reserves. With this app you get a more precise temperature reading for a remote location than using the temperature of the nearest town.

How does it work? You can type the latitude and longitude values manually, or you can click on the location on the world map to get the values automatically. You also give it a custom name. Once the location has been added you can see the current temperature and the weather condition. You are also able to see the weather forecast for the following 8 days for that specific location.

## React/JavaScript concepts:

- Seperate components for each section of the app
- Seperate CSS file for each component
- Hooks (useState, useEffect)
- Conditional rendering 
- Props
- ES6
- localStorage
- Input Validation - I used regex and the isNaN function to validate the location name, latitude and longitude inputs.
- The map and filter methods

## npm packages:
- [leaflet](https://www.npmjs.com/package/leaflet) and [react-leaflet](https://www.npmjs.com/package/react-leaflet) - I used the Leaflet library to display an interactive world map on the page.
- [React-icons](https://www.npmjs.com/package/react-icons) - I used icons as buttons on location components.
- [Nanoid](https://www.npmjs.com/package/nanoid) - I used it to generate ids for each saved location object.
- [Unix-timestamp](https://www.npmjs.com/package/unix-timestamp) - I used it to convert the OpenWeather unix timestamp to a readable time.

## API:
- [OpenWeather](https://openweathermap.org/) - I used a basic fetch request inside a useEffect hook to do an API call to get the weather data for a specific location. This useEffect hook runs when changes are detected in the ‘locations’ state.

I used Netlify to deploy the web app and stored the OpenWeather API key as an environmental variable on the backend managed by Netlify.

Click [here](https://anyweather.netlify.app/) to visit the web app.
