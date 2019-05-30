/****************************************
AJAX testing
Michael Patson
May 12th, 2018
************************************/


var apiKey = "b0fe373fc1c7a3e650d97fee41d4e9c0"; //from website
document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons()
{
    //set up for each button
    document.getElementById("zipCodeSubmit").addEventListener("click", function (event)
    {
        var req = new XMLHttpRequest();
        var zipCode = document.getElementById("zipCode").value;
        var apiSubmit = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial" + "&appid=" + apiKey;
       
        
        req.open("GET", apiSubmit, true);

        req.addEventListener("load", function ()
        {
            var response = JSON.parse(req.responseText);
            document.getElementById("cityName").textContent = response.name;
            document.getElementById("country").textContent = response.sys.country;
            document.getElementById("temp").textContent = response.main.temp;
            document.getElementById("temp_max").textContent = response.main.temp_max;
            document.getElementById("humidity").textContent = response.main.humidity;
        });
        req.send(null);
        event.preventDefault();
    });

    document.getElementById("cityStateSubmit").addEventListener("click", function (event)
    {
        var req = new XMLHttpRequest();
        var city = document.getElementById("city").value;
        var apiSubmit = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey
        
        req.open("GET", apiSubmit, true);

        req.addEventListener("load", function ()
        {
            var response = JSON.parse(req.responseText);
            document.getElementById("cityName").textContent = response.name;
            document.getElementById("country").textContent = response.sys.country;
            document.getElementById("temp").textContent = response.main.temp;
            document.getElementById("temp_max").textContent = response.main.temp_max;
            document.getElementById("humidity").textContent = response.main.humidity;
        });

        req.send(null);
        event.preventDefault();
    });

    
    //I tried to get a little creative with this, I couldnt come up with anything as clever as "payload"
    document.getElementById("inputSubmit").addEventListener("click", function(event)
    {
        var req = new XMLHttpRequest();
        var payload = document.getElementById("input").value;
        req.open('POST', 'http://httpbin.org/post', true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function()
        {
            var response = JSON.parse(req.responseText);
            document.getElementById("whisper").textContent = response.data;
        });
        req.send(JSON.stringify(payload));
        document.getElementById("response").textContent = payload;
        event.preventDefault();
    });
}