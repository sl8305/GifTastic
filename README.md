# GifTastic

### Overview

The GIPHY API is used to dynamically create a web page that populates with gifs of your choice. JavaScript is used to hit the api and jQuery changes the HTML of your site. Animals were used as the default theme but the user is able to freely add in queries with the javascript input.

* A loop is used to append buttons for each string to the page which will each query the GIPHY API when pressed for their specific name. 
* 10 static, non-animated gif images from the GIPHY API are rendered to the page when a button is pressed. 
* When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it stops playing.
* Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
* A user can add a `topic` if they don't see one they like using the input form on the page (right side). A Javascript function is used to add the topic to the array and remake the buttons on the page. 

### TECHNOLOGY USED:
* JavaScript
* jQuery
* HTML
* CSS
