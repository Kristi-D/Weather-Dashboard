$("#currentDay").text(moment().format("dddd, MMMM DD, YYYY"));

// SEARCH BUTTON
// calls the request function with the user input value 
//********************************************** */
$('#searchCity').on('click', function (e) {
    // prevents the page from reloading
    e.preventDefault();

    // testing functionality 
    // console.log('working?');

    // this is the value that is typed in by the user 
    let value = $('#cityInputValue').val()

    // if the input is not value the don't run the request 
    if (value === '') {
        return
    } else {
        requestAjax(value);
    }

});
//********************************************** */

// GET REQUEST FUNCTION
// this function will do a GET request and populate the dashboard
//********************************************** */
function requestAjax(cityName) {

    // This is our API key
    let APIKey = "22be124d345b2de6c784ce70cc777a58";

    // this is target URL
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;


    // CALLS WEATHER 5-FORECAST FOR EACH DAY  
    //********************************************** */
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // coordinates of current city 
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;

        // Current days info
        //********************************************** */
        // city name 
        $(".city").text(response.city.name);
        // wind speed in converted from meters/seconds to MPH 
        $(".wind").text((response.list[0].wind.speed * 2.23694).toFixed(1));
        //********************************************** */

        // RENDERING WEATHER 5-FORECAST FOR EACH DAY  
        //********************************************** */
        for (let i = 0; i < response.list.length; i++) {
            // icon URL
            let iconUrl = 'http://openweathermap.org/img/wn/';
            //  individual Icon for each days forecast
            let weatherIcon = iconUrl + response.list[i].weather[0].icon + '@2x.png';
            let weatherDescription = response.list[i].weather[0].description;

            // used to test the weather icons
            // console.log(weatherDescription)

            // calculating conversion from Kelvin to Farenheit
            let K = response.list[i].main.temp;
            let F = (K - 273.15) * 1.80 + 32;

            // humidity for all the days
            $(".humidity" + i).text(response.list[i].main.humidity);

            // temp converted to ºF for all the dates
            $(".temp" + i).text(F.toFixed(0));

            // this is the icon for the each day forecast Appended to the html
            $('.icon' + i).attr('src', weatherIcon);

            // this is the description for the weather Icon 
            $('.description' + i).text(weatherDescription);

            // [DAYS] setting the current date for the jumbotron display
            $('.day' + i).text(moment().add(i, 'days').format('M/DD/YY'));

           }
        //********************************************** */


    });


    checkWidth();

    // This function makes the dates typography responsive 
    function checkWidth() {
        if ($(window).width() > 763) {
            $('.cards').removeClass('display-4');
            $('.descriptionWeight').addClass('font-weight-light');
        }
        else {
            $('.cards').addClass('display-4');
        }
    }
    
    $(window).resize(checkWidth);
}
