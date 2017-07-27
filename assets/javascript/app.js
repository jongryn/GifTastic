/*
// Created: July 23, 2017 4:40 PM
// Author: Jonathan Gryn
// Revisions: Jon (7/23/17) - Added JS
*/

var athletesArray = ["Kobe Bryant", "Michael Jordan", "Larry Bird", "Steve Young", "Troy Aikman"];

$(document).ready(function() {
  for (var i = 0; i < athletesArray.length; i++) {
  	$("#althete-buttons").append("<button type='button' onclick='searchGif(\"" + athletesArray[i] + "\")' class='btn btn-primary' value=' " + athletesArray[i] + "'> " + athletesArray[i] + " </button>");
  }
});

function athleteButtonClicked() {
  var userInput = $('#athlete-input').val();
  searchGif(userInput);
}

function submitButtonClicked() {
  var userInput = $('#athlete-input').val();

  if(userInput) {
  	$('#athlete-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput +"'> " + userInput + " </button>");
  }
}

function searchGif(gifName) {
  $.ajax({
  	url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
  	type: 'GET',
  })
  .done(function(response) {
  	displayGif(response);
  })
}

function displayGif(response) {
  $('#athletes').empty();
  for (var i = 0; i < response.data.length; i++) {
  	var rating = "<div class='ratings'> Rating: " + (response.data[i].rating) + " </div>";
  	var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url + '"data-still=" ' + response.data[i].images.fixed_height_still.url + ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="movImage" style= "width:250px; height: 250px">';

  	image = '<div class="col-md-4">' + image + "</div>";
  	$('#athletes').append(image);

  }

  $('.movImage').on('click', function() {
  	var state = $(this).attr('data-state');
  	if (state == 'still') {
  		$(this).attr('src', $(this).attr("data-animate"));
  		$(this).attr('data-state', 'animate');
  	} else {
  		$(this).attr('src', $(this).attr("data-still"));
  		$(this).attr('data-state', 'still');
  	}
  	
  });
}