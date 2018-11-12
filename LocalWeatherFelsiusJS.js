// JavaScript Document
"use strict";

var lat, lon, felsiusTemp, celsiusTemp, locName;

$( document ).ready(function() {
    setup();
});


function setup() {
	getLocation();
}

//getLocation from browser cordinates
function getLocation() {
	  navigator.geolocation.getCurrentPosition(getWeather);
}

//getWeather from open weather api based on lat and lon
function getWeather(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	lat.toString();
	lon.toString();
	var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=97a5f3df61da0cc782f3b7d54f6dccb0&units=metric";
	$.getJSON(weatherApiUrl, main);
}

function main(data) {
	celsiusTemp = data.main.temp;
	locName = data.name;
	
	felsiusTemp = celsiusTemp * 7 / 5 + 16;
	felsiusTemp = Math.round(felsiusTemp);
	felsiusTemp.toString();
	
	$(".location-value").text(locName);
	$(".felsius-value").text(felsiusTemp + "°⋲");
	
	//icon
	var useIcon = data.weather[0].icon;
	useIcon = useIcon.substr(0, 2);
	var useDescription = data.weather[0].description;
	var useIconInt = parseInt(useIcon);
	if(useIconInt === 50) {
		useDescription = "myst";
	}
	var imageStr = "<img src=\"data/weather-icons-" + useIcon + ".png\" alt=\"" + useDescription + "\"/>";
	$(".icon-value").html(imageStr);
	
	//icon caption
	var captionStr = "<h3 class=\"image-caption\">" + useDescription + "</h3>";
	$(".caption-value").html(captionStr);
}