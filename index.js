// Code included inside $(document).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
    //empty search input value on initialization
    $("#searchInput").val('');

    var container = $('#popular-movies');
    // get list of popular films using tmdb.js
    getPopularMovies(container);


    // after 3 letters, search TMDB API for movie that contains that letters typed in the input field
    // and fill the suggestion box (autocomplete) jquery widget with the results from tmdb
    $("#searchInput").autocomplete({
        //minimum length for searching movie is 3 characters
        minLength: 3,
        // the source for the autocompete is the response (movies) from ajax call
        source: function (request, response) {
            $.ajax({
                url: `${url}/search/movie?query=${$("#searchInput").val()}&${apiKey}`,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    response($.map(data.results, function (item) {
                        return {
                            // the label is movie title + year of release
                            label: item.title + ' - ' + new Date(item.release_date).getFullYear(),
                            // value is the movie id - used in function for opening details for selected movie
                            value: item.id
                        };
                    }));
                },
            })
        },
        // on click on element, go to the details page and fetch info for the selected movie
        select: function (event, ui) {
            document.location.href = './details.html?id=' + ui.item.value + '&new=0';
        }
    });

})