let weather = {
    "apiKey": "120ba95b82f840eb313bca1fe845c2d2",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;

        var today = new Date();

        var date = today.getDate()+' '+  today.toLocaleString('default', { month: 'long' }) + "   "+ today.getFullYear() ;

        var time = today.getHours() + ":" + today.getSeconds();
        document.querySelector(".date-time").innerHTML =  date + ' \n ' + time;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = "Temperature " + temp + "°C";
        document.querySelector(".humidity").innerText = "humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed " + speed + "km/h";

        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage =  "url('https://source.unsplash.com/1600x900/?" + description + "')";
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
}

document.querySelector(".search").addEventListener("click", function(){
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function(){
    if( event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("")
