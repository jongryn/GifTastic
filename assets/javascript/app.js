/*
// Created: July 23, 2017 4:40 PM
// Author: Jonathan Gryn
// Revisions: Jon (7/23/17) - Added JS
*/

// create an array of characters - in this case, Star Wars Characters
var characters = ["Anakin Skywalker", "Yoda", "Leia Organa", "Luke Skywalker", "Kylo Ren", "boba Fett", "Clone tropper", "Pademe Amidala", "Han Solo", "R2-D2"];

// creates buttons for each of these
function makeButtons(){
  
  // deletes the characters prior to adding new characters so there are no repeat buttons
  $('#buttonsView').empty();

  // loops through the charactres array
  for (var i = 0; i < characters.length; i++){

  	// dynamically makes buttons for every show in the array
  	var a = $('<button>')
  	a.addClass('character'); // add a class
  	a.attr('data-name', characters[i]); // add a data-attribute
  	a.text(characters[i]); // make button text
  	$('#buttonsView').append(a); // append the button to buttonsView div
  }
}

// handles addCharacter button event
$("#addCharacter").on("click", function() {
  
  // grabs the user character input
  var character = $("#character-input").val().trim();

  // that input is now added to the array
  characters.push(character);

  // the makeButtons function is called, which makes buttons for all characters plus the user character
  makeButtons();

  // this line is so users can hit "enter" instead of clicking the submit button
  return false;
})

// function to display gifs
function displayGifs(){
  var character = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&limit=9&api_key=dc6zaTOxFJmzC";

  // creates ajax call
  $.ajax({url: queryURL, method: "GET"}).done(function (response) {
  	console.log(response.data);

  	// save results as a variable
  	var results = response.data;

  	// for loop goes through each gif and adds these variables
  	for (var i = 0; i < results.length; i++) {

  	  // creates a generic div to hold the results
  	  var gifDiv = $('<div class=gifs>');
  	  var characterGif = $('<img>');
  	    characterGif.attr('src', results[i].images.fixed_height_still.url);

  	    // characters the rating on the hover
  	    characterGif.attr('title', "Rating: " + results[i].rating);
  	    characterGif.attr('data-still', results[i].images.fixed_height_still.url);
  	    characterGif.attr('data-state', 'still');
  	    characterGif.addClass('gif');
  	    characterGif.attr('data-animate', results[i].images.fixed_height.url);

  	  // var rating = results [i].rating;
  	  // var p = $('<p>').text('Rating: ' + rating);
  	  gifDiv.append(characterGif)

  	  // gifDiv.append(p)

  	  $("#gifsView").prepend(gifDiv);
  	}
  });
}

// function for animating gifs
$(document).on('click', '.gif', function(){
  var state = $(this).attr('data-state');
    if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    };

});

// function for displaying character gifs
$(document).on("click", ".character", displayGifs);

// initially calls the makeButtons function
makeButtons(); 