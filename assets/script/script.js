// when the document is ready, run this function 
$(document).ready(function () {
    // event listener for the search button
    $("#search-button").on("click", function (event) {
        // prevent the default action of the event
        event.preventDefault();
        // get the value of the search input
        var city = $("#search-input").val();
        // call the function to get the data from the API
        console.log(city);
        fetchGeoData(city);
    });


    // function that calls the API and gets the lon and lat of the city
    function fetchGeoData(city) {
        // fetch the data from the API
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=7edf678be3dfbb52ca6176d7c38aa0f0")
            // when the data is returned, convert it to JSON
            .then(function (response) {
                return response.json();
            })
            // when the data is converted to JSON, call the function to get the weather data
            .then(function (data) {
                console.log(data);
                // get the lon and lat from the data
                var lat = data[0].lat.toString();
                var lon = data[0].lon.toString();
                // call the function to get the weather data
                console.log(lat, lon);
            });
    }


});