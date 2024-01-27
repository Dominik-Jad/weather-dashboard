// when the document is ready, run this function 
$(document).ready(function () {
    // event listener for the search button
    var lat = "";
    var lon = "";

    $("#search-button").on("click", function (event) {
        // prevent the default action of the event
        event.preventDefault();
        // get the value of the search input
        var city = $("#search-input").val();

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
                            // displayWeatherData(data);
                        });
                });
        }
        else {
            alert("Please enter a city");
        }
    });

   

});