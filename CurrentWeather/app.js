window.onload = function () {
    var btnGetWeather = document.getElementById("get-weather");

    btnGetWeather.addEventListener("click", downloadNow);
    
    var latitude, longitude;
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {   
       latitude = position.coords.latitude;
       longitude = position.coords.longitude; 
    }
    getLocation();
    
    var displayWeather = document.getElementById('weather-info');
    conversionBtnsContainer = document.getElementById('conversion-btns');
    
    function downloadNow() {        
        
        var weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=832f324fbe25f7dda516b703bea7299e`;
        //'http://api.openweathermap.org/data/2.5/weather';        
        // "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=832f324fbe25f7dda516b703bea7299e";       
        
        return fetch(weatherApi, {
                    method: 'GET',
                    type: 'cors',                    
                    headers: {
                        'Accept': 'application/json'
                    }
        })
        .then (currentWeather => currentWeather.json())
        .then (weatherInfo => {            
            console.log(weatherInfo)

            displayWeather.innerHTML = '';
            conversionBtnsContainer.innerHTML = '';
            displayWeather.style.textShadow="2px 5px 5px white"

            document.getElementById('location').innerHTML = `Now in ${weatherInfo.name}`;

            //temterature
            var temperature = document.createElement('div'); 
            temperature.innerHTML = `${kelvinToCelsius(weatherInfo.main.temp)}&#8451;`;
            temperature.id = 'temperature';
            displayWeather.appendChild(temperature);
            
            //sky - clear, cloudy...
            var sky = document.createElement('div'); 
            sky.innerHTML = weatherInfo.weather[0].description;
            sky.id = 'sky';
            displayWeather.appendChild(sky);
            //wind
            var wind = document.createElement('div'); 
            wind.innerHTML = `wind - ${weatherInfo.wind.speed} m/s`;
            displayWeather.appendChild(wind);

            //button for temperature conversion
            var conversion = document.createElement('button'); 
            conversion.innerHTML = `Get temperature in F`;
            conversion.style.fontSize = '16px';
            console.log(kelvinToCelsius(weatherInfo.main.temp));                        
            conversion.id = 'conversion';
            conversion.onclick = conversionFunc(kelvinToCelsius(weatherInfo.main.temp));
            conversionBtnsContainer.appendChild(conversion);
            
        })
        .catch((error) => {
            displayWeather.innerHTML = "Check if it's allowed to get your location";
            displayWeather.style.textShadow="2px 5px 5px red"
            console.log("for now")
        });
    }

    function kelvinToCelsius(kelTemp) {
        return kelTemp-273.15;
    }

    function conversionFunc(celTemp) {
        return function() {
            var that = document.getElementById('conversion');
            if (that.innerHTML==`Get temperature in F`) {
                document.getElementById('temperature').innerHTML = `${(celTemp*9/5)+32} F`;
                that.innerHTML = `Get temperature in &#8451;`;
            }
            else {
                document.getElementById('temperature').innerHTML = `${celTemp}&#8451;`;
                that.innerHTML = `Get temperature in F`;
            }
        }
    }
    
};