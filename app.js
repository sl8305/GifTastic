// .ready is used to make sure the javascript waits until the page is created. 
// this is needed to make sure Jquery can refernce the correct elements after they are created. 
// w/o this Jquery would reference elements before they are created and not "work"
$(document).ready(function() {

    // array of preset animals
    var animals = [
      "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
      "bird", "ferret", "turtle", "sugar glider", "chinchilla",
      "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
      "capybara", "teacup pig", "serval", "salamander", "frog"
    ];
  
    // function dynamically adds buttons and assigns classes and text to each button
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      // Clears the div where the gifs will populate
      // This ensures any unnecessary information is cleared at the start before any buttons are used to output gifs
      $(areaToAddTo).empty();
  
      // loops through the array given to dynamically create the buttons and give them attributes
      for (var i = 0; i < arrayToUse.length; i++) {
        // variable to reference the buttons created
        var a = $("<button>");
        
        // dynamically adding the class from the function's intake to the button created above
        a.addClass(classToAdd);


        // gives the button a data type of the given array at the current index in the loop
        a.attr("data-type", arrayToUse[i]);
        
        // gives each button the name assosiated to the current index of the array
        a.text(arrayToUse[i]);
        
        // appends each button to the button div
        $(a).appendTo(areaToAddTo);
        // $(areaToAddTo).append(a);
      }
    }
  
    // The following is executed when a button with the class animal-button is clicked
    // jquery and the .on method is used to reference the buttons on the page with the specified class
    $(document).on("click", ".animal-button", function() {
      // jquery is used to reference the div with the id animals and clears it to ensure nothing was saved prior to the start. 
      $("#animals").empty();

      // .removeClass is used to take off the class "active" from the buttons with the  animal-buttons class
      // this is used to make sure none of the links associated to the buttons are working "therefore the images and gifs don't appear"
      $(".animal-button").removeClass("active");
      
      // this refers to the action of clicking the animal button
      // .addClass gives the button its "active" state and makes the url links associated with each "active" or working.
      $(this).addClass("active");
      
      // variable type is used to store the currently referenced animal button and give it an attribut of "data-type"
      var type = $(this).attr("data-type");

      // the variable queryURL is used to store and api reference. 
      // it is broken up to 
      //    1) first reference the gif search api
      //    2) then use the type variable to change depending on the animal button that was referenced
      //    3) ends with the apikey in order to use said api (permission to access the api)
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=15";
      // tail end of the api key includes instructions to pull a maximum of 10 images/gifs
  
      // using the jquery ajax method to preform the get method
      // Asychronous javascript and XML - doesn't work in order and therefore can access the api while moving further through the code
      $.ajax({
        // url link used is the variable that stores the dynamic api link above. 
        url: queryURL,
        // initialize a GET method in order to retrieve the information
        method: "GET"
      })
        // .then() => method from the promise library that promises to execute the following call back function
        // call back function => nested function called by a parent function. 
        .then(function(response) {
          // variable is created to store the results of the get method (info retrieved from accessing the api)
          var results = response.data;
  
          // loops through the entire list of information pulled from the api
          // in this case it is looping through the 10 image objects
          for (var i = 0; i < results.length; i++) {
            // creation of the div with the class animal-item for each object. 
            var animalDiv = $("<div class=\"animal-item\">");
  
            // variable that dynamically stores the rating for each of the image/gif objects
            var rating = results[i].rating;
  
            // p variable stores the creation of a p tag with the text 
            //  1) "Rating " concatonated with the value of the rating stored above.
            var p = $("<p>").text("Rating: " + rating);
  
            // two sets of variables store the still image and gif or animated version of each object.
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            // the animalImage variable stores the creation of an image tag.
            //  each are then given the attributes of 
            //    1) the source code for the still image
            //    2) the attribut of still with the still url
            //    3) the source code for the animated image
            //    4) the data type of data state still 
            //    4) the class animal-image is given to each set of images using the .addClass method
            var animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");
  
            // the pargraph with the rating is added to the animal div created at the start of the loop
            p.appendTo(animalDiv);

            // the image variable that stores the still and animated versions of each animal button are appened to the corresponding animal div
            animalImage.appendTo(animalDiv);

            // jquery is used to append each set of ratings with animal images/gifs to the empty animals div
            // there should be 10 by the end of the loop
            $(animalDiv).appendTo('#animals');

          }
        });
    });
  
    // when an image with the class "animal-image" is clicked the following function is activated
    $(document).on("click", ".animal-image", function() {
      // variable state stores the state of the current image obj that is clicked. 
      var state = $(this).attr("data-state");
  
      // if the state of the image is still
      //    1) the source code is switched to reference the animated source code attribute within the image object
      //    2) the state of the image is changed from still to animate
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
      // else if the state is equal to animate
      //    1) the source code is switched to the still url stored within the imag object by referencing the img objects data still attribute
      //    2) the state of the image object is then set to still 
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    // using jquery if the add animal button is clicked the following function is executed
    $("#add-animal").on("click", function(event) {
      // event.preventDefault is a jquery method that doesn't accept any arguments
      // the default action of the event will not be triggered 
      event.preventDefault();
      
      //variable newAnimal stores the value of the input at the index of 0 using the .eq() method.
      // .eq(0) references the input element at the first index
      var newAnimal = $("input").eq(0).val();

  
      // if the length of the new animal is greater than 2 then it will push it to the animals array
      // as long as the string value is larger than two letters the following will happen
      if (newAnimal.length > 2) {
        // the new input is added to animals array at the end
        animals.push(newAnimal);
      }
  
      // method executes the populateButtons function to create the animal buttons with the newly added button
      populateButtons(animals, "animal-button", "#animal-buttons");
  
    });
    // calls the function at the top to create the default animal buttons that generate at the start of the page. 
    // it uses the array animals to loop through and create buttons for each index with the animal-button class and appends it to the animal-buttons div
    populateButtons(animals, "animal-button", "#animal-buttons");
  });
  