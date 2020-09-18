// Code included inside $(document).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
    let params = new window.URLSearchParams(window.location.search);
    let movieId = params.get('id');
    let isNew = params.get('new');
    getMovieDetails(movieId, !!isNew);
})

