$(document).ready(function() {

    var animals = [
      "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
      "bird", "ferret", "turtle", "sugar glider", "chinchilla",
      "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
      "capybara", "teacup pig", "serval", "salamander", "frog"
    ];
  
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".animal-button", function() {
      $("#animals").empty();
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
  