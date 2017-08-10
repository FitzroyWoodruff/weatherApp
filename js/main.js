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
var goat= "28.0112085,-80.6715208"
var better = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var ender = "&sensor=true";
const title = "Weather App";

// document ready function goes here
$(document).ready(function(){
  if(geo){
    geo.getCurrentPosition(function(pos){
      var one = pos.coords.longitude;
      var two = pos.coords.latitude;
      var lon = "lon=" + pos.coords.longitude;
      var lat = "lat=" + pos.coords.latitude;
      //call the betterLocation function from below
      betterLocation(two, one);
      //call the weather function from below
      weather(lat, lon);
    });
  } else {
    alert("Please try a modern browser");
  }
});

//getting more accurate location infor
function betterLocation(a, b){
  var locX = better + a + "," + b + ender;
  $.ajax({
    url: locX,
    success: function(result){
      $("#area").html("<h3>" + result.results[2].formatted_address + "</h3>");
      //console.log(result.results[2].formatted_address);
    }
  });
}

//here I create my weather function to access my data
function weather(y, x){
  var dataX = data + y + "&" + x;
  $.ajax({
    url: dataX,
    success: function(response){
      cTemp = Math.round(response.main.temp * 10) /10;
      fTemp = Math.round(response.main.temp * 9 / 5 + 32);

      if(fTemp >= 95){
        $("body").addClass("hot");
      }else if(fTemp < 95 && fTemp >= 90){
        $("body").addClass("beach");
      }else if(fTemp < 90 && fTemp >= 82){
        $("body").addClass("nice");
      }else{
        $("body").addClass("cold");}



      $("#ftemp").html("<h1>" + fTemp + "&#8457; </h1>");
      $("#ctemp").html("<h1>" + cTemp + "&#8457; </h1>");
      $("#skys").html("<h3>" + response.weather[0].main + "</h3>");

      $("#tempToggle").click( function(){
        $(".temps").toggle();
      });

    }
  });
}
