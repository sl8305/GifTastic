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
        $(areaToAddTo).append(a);
      }
    }
  
    // The following is executed when a button with the class animal-button is clicked
    // jquery and the .on method is used to reference the buttons on the page with the specified class
    $(document).on("click", ".animal-button", function() {
      // jquery is used to reference the div with the id animals and clears it to ensure nothing was saved prior to the start. 
      $("#animals").empty();

      // .removeClass is used to take off the class "active" from the 
      $(".animal-button").removeClass("active");
      

      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div class=\"animal-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");
  
            animalDiv.append(p);
            animalDiv.append(animalImage);
  
            $("#animals").append(animalDiv);
          }
        });
    });
  
    $(document).on("click", ".animal-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      var newAnimal = $("input").eq(0).val();
  
      if (newAnimal.length > 2) {
        animals.push(newAnimal);
      }
  
      populateButtons(animals, "animal-button", "#animal-buttons");
  
    });
  
    populateButtons(animals, "animal-button", "#animal-buttons");
  });
  