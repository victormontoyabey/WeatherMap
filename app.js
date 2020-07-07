window.addEventListener('load', ()=> {
    let long;
    let lat;
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d5f88bf8e740a9d82677f46f346f0a33&units=Imperial`;
        
            fetch(api) 
            .then(response => {
                return response.json();
                })
                .then(data => {
                    console.log(data);
                    // Set DOM Elements from the API 
                    locationTimeZone.textContent = data.name;
                    temperatureDegree.textContent = Math.round(data.main.temp);
                    temperatureDescription.textContent = data.weather[0].description;

                    let iconCode = data.weather[0].icon;
                    let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

                    $('#weather-icons').attr('src', iconUrl);
                    
                });
        });
    }
});