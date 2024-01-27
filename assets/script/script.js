// when the document is ready, run this function 
$(document).ready(function () {
    // event listener for the search button
    $("#search-button").on("click", function (event) {
        // prevent the default action of the event
        event.preventDefault();
        // get the value of the search input
        var city = $("#search-input").val().trim();
        // if the city is not empty fetch the lon and lat of the city
        if (city) {
            fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city
                + "&limit=1&appid=7edf678be3dfbb52ca6176d7c38aa0f0")
                .then(function (response) {
                    return response.json();
                })
                // when the data is converted to JSON, call the function to get the weather data
                .then(function (data) {
                    console.log(data);
                    // get the lon and lat from the data returned from the 1st fetch 
                    var lat = data[0].lat.toString();
                    var lon = data[0].lon.toString();
                    // fetch the weather data using the lon and lat
                    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat
                        + "&lon=" + lon + "&units=metric&appid=7edf678be3dfbb52ca6176d7c38aa0f0")
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            // display the data from the second fetch 
                            console.log(data);
                            displayCurrentWeather(data);
                            // displayForecast(data);
                        });
                });
        }
        else {
            alert("Please enter a city");
        }
    });

    // function to display the weather data
    function displayCurrentWeather(data){
        // get the forecast data from the data returned from the fetch 
        var forecast = data.list;
        // get the current date
        var today = dayjs().format('(DD/MM/YYYY)');
        // todays forecast 
        $("#today").empty();
        var todayHeadingEl = $("<h2>").text(data.city.name+ " " + today);
        var todayIconEl = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecast[0].weather[0].icon + ".png");
        var todaytempEl = $("<p>").text("Temperature: " + forecast[0].main.temp + "°C");
        var todaywindEl = $("<p>").text("Wind: " + forecast[0].wind.speed + " MPH");
        var todayhumidityEl = $("<p>").text("Humidity: " + forecast[0].main.humidity + "%");

        todayHeadingEl.append(todayIconEl);
        $("#today").append(todayHeadingEl, todaytempEl, todaywindEl, todayhumidityEl);
    }
   

});