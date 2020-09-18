// Code included inside $(document).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
    // the container where the movie will be appended
    let container = $('#watch');
    //get list of to watch movies from tmdb.js
    getToWatchMovies(container);
})