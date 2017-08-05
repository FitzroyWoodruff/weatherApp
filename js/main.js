/**
Project Name: FCC Weather App
File Name: main.js
Author Name: Fitzroy Woodruff
Site: http://kleeshay.com
Description: main javascript file
*/

//setting global variabls
var lon;
var lat;
var celsius;
var cTemp;
const geo = navigator.geolocation;
var data = "https://fcc-weather-api.glitch.me/api/current?";
const title = "Weather App";

// document ready function goes here
$(document).ready(function(){
  if(geo){
    geo.getCurrentPosition(function(pos){
      var lon = "lon=" + pos.coords.longitude;
      var lat = "lat=" + pos.coords.latitude;
      //console.log(lon);
      //console.log(lat);

      //call the weather function from below
      weather(lat, lon);
    });
  } else {
    alert("Please try a modern browser");
  }



});

//here I create my weather function to access my data
function weather(y, x){
  var dataX = data + y + "&" + x;
  $.ajax({
    url: dataX,
    success: function(response){
      cTemp = Math.round(response.main.temp * 10) /10;
      fTemp = Math.round(response.main.temp * 9 / 5 + 32);

      $("#ftemp").text(fTemp);
      $("#ctemp").text(cTemp);
      $("#city").text(response.name);
      $("#skys").text(response.weather[0].main);
      //console.log(cTemp);
      //console.log(fTemp);
      //console.log(response);
      //console.log(dataX);
    }
  });
}
