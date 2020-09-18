// The Movie DataBase API URL
var url = "https://api.themoviedb.org/3";
// API key for getting data
var apiKey = "api_key=3cd0dd2699b27757b055a6c0ecae86b7";


// get list of most popular movies
function getPopularMovies(container) {
    // ajax call for getting movies
    $.ajax(`${url}/movie/popular?${apiKey}`, {
        // A function to be called when the request finishes
        complete: function (response) {

            // get the JSON object from the response 
            data = response.responseJSON;

            // the container where the movie will be appended
            //var container = $('#popular-movies');

            // create card for the movie with its info
            data.results.forEach(movie => {
                var element = `<div class="card mb-3">
                                    <div class="row no-gutters">
                                        <div class="col-auto p-3">
                                            <img src="https://image.tmdb.org/t/p/w154${movie.poster_path}" alt="">
                                        </div>
                                        <div class="col p-3 d-flex flex-column justify-content-between">
                                            <div class="card-block px-2">
                                                <div class="row justify-content-between m-0 pb-3">
                                                    <h4 class="card-title">${movie.title}</h4>
                                                    <div>
                                                        <button class="btn btn-dark" onclick="addToFavorite(${movie.id})"><i class="fa fa-heart-o" style="font-size: 20px""></i> Add to Favorite</button>
                                                        <button class="btn btn-dark" onclick="addToWatch(${movie.id})"><i class="fa fa-eye" style="font-size: 20px""></i> Add to Watch</button>
                                                        <button class="btn btn-dark" onclick="addToWatched(${movie.id})"><i class="fa fa-eye-slash" style="font-size: 20px""></i> Add to Watched</button>
                                                    </div>
                                                </div>
                                                <p class="card-text text-justify">${movie.overview}</p>
                                                <p>Release date: ${new Date(movie.release_date).toDateString()}</p>
                                            </div>
                                            <div class="card-footer w-100 text-muted border-0">
                                                <a href="./details.html?id=${movie.id}">Show details about this movie</a>
                                            </div>
                                        </div>
                                    </div>
                              </div>`;

                // append the card to the container
                container.append(element);
            });
        }
    });
}


// add items to favorite list - we will keep the ids of the movies in localstorage
function addToFavorite(id) {
    // get favorites from localstorage, or initialize the variable to empty string if there are no favorites
    var favorites = localStorage.getItem('favorites') && localStorage.getItem('favorites').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let fav = favorites.length ? JSON.parse(favorites) : [];
    // add the movie to the array of favorites
    fav.push(id);
    // save the modified array in localstorage
    localStorage.setItem('favorites', JSON.stringify(fav));
}


// add items to watch list - we will keep the ids of the movies in localstorage
function addToWatch(id) {
    // get to watch movies from localstorage, or initialize the variable to empty string if there are no to watch movies
    var watch = localStorage.getItem('watch') && localStorage.getItem('watch').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let w = watch.length ? JSON.parse(watch) : [];
    // add the movie to the array of to watch movies
    w.push(id);
    // save the modified array in localstorage
    localStorage.setItem('watch', JSON.stringify(w));
}


// add items to watched list - we will keep the ids of the movies in localstorage
function addToWatched(id) {
    // get watched movies from localstorage, or initialize the variable to empty string if there are no watched movies
    var watched = localStorage.getItem('watched') && localStorage.getItem('watched').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let wed = watched.length ? JSON.parse(watched) : [];
    // add the movie to the array of favorites
    wed.push(id);
    // save the modified array in localstorage
    localStorage.setItem('watched', JSON.stringify(wed));
}

// get movie details - by selected id (if it is new - clicked from suggestion box, add buttons Favorite, TO Watch and Watched)
function getMovieDetails(id, isNew) {
    // ajax call to get movie details
    $.ajax(`${url}/movie/${id}?${apiKey}`, {
        // A function to be called when the request finishes
        complete: function (response) {
            // get the JSON object from the response 
            data = response.responseJSON;

            // the container where the movie will be appended
            var container = $('#movie');

            var genres = [];
            data.genres.forEach(element => {
                genres.push(element.name);
            });
            var languages = [];
            data.spoken_languages.forEach(element => {
                languages.push(element.name);
            });
            var countries = [];
            data.production_countries.forEach(element => {
                countries.push(element.name);
            });
            var companies = [];
            data.production_companies.forEach(element => {
                companies.push(element.name);
            });


            // create card for the movie with its info
            var element = `<div class="card mb-3">
                                <div class="row no-gutters">
                                    <div class="col-4 pt-3 pb-3 bg-dark d-flex justify-content-center">
                                        <img src="https://image.tmdb.org/t/p/w342${data.poster_path}" alt="">
                                    </div>
                                    <div class="col-8 card-body p-0">
                                        <h3 class="card-title bg-dark pt-3 pl-3 mb-0 text-white d-flex justify-content-between">${data.title} `;
            if (isNew) {
                element += `<div>
                                                <button class="btn btn-dark" onclick="addToFavorite(${data.id})"><i class="fa fa-heart-o" style="font-size: 20px""></i> Add to Favorite</button>
                                                <button class="btn btn-dark" onclick="addToWatch(${data.id})"><i class="fa fa-eye" style="font-size: 20px""></i> Add to Watch</button>
                                                <button class="btn btn-dark" onclick="addToWatched(${data.id})"><i class="fa fa-eye-slash" style="font-size: 20px""></i> Add to Watched</button>
                                            </div>`;
            }
            element += `</h3>
                                        <p class="card-title bg-dark pb-3 pl-3 mb-0 text-white">${data.tagline}</p>
                                        <div class="p-3 d-flex flex-column justify-content-between" style="height: calc(100% - 5rem)">
                                            <h6 class="card-subtitle mb-3">${data.overview}</h6>
                                            <div>
                                                <div class="row">
                                                    <div class="col-4 font-weight-bold">Genres</div>
                                                    <div class="col-8">${genres.toString()}</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4 font-weight-bold">Languages</div>
                                                    <div class="col-8">${languages.toString()}</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4 font-weight-bold">Date of Release</div>
                                                    <div class="col-8">${new Date(data.release_date).toDateString()}</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4 font-weight-bold">Status</div>
                                                    <div class="col-8">${data.status}</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4 font-weight-bold">Production Companies</div>
                                                    <div class="col-8">${companies.toString().split(',').join(', ')}</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-4 font-weight-bold">Production Countries</div>
                                                    <div class="col-8">${countries.toString().split(',').join(', ')}</div>
                                                </div>
                                            </div>
                                            <div id="actors" class="mt-3">
                                            </div>`;
            if (data.homepage.length) {
                element += `<a class="" target="_blank" href="${data.homepage}" disabled>Visit website</a>`;
            } else {
                element += `This movie does not have home page.`;
            }
            element += `</div>
                    </div>
                </div>
            </div>`;

            // apend the card to the container
            container.append(element);

            var actors = `<div class="row flex-wrap">`;
            // ajax call to get actors
            $.ajax(`${url}/movie/${id}/credits?${apiKey}`, {
                complete: function (res) {
                    data = res.responseJSON;

                    data.cast.splice(0, 10).forEach(element => {
                        actors += `<div class="col">
                                    <img src='https://image.tmdb.org/t/p/w92${element.profile_path}' width="50"  class="rounded-circle text-center"/>
                                    <p class="m-0">${element.name}</p>
                                </div>`;
                    })
                    actors += `</div>`;
                    $('#actors').html(actors);
                }
            });
        }
    });
}


// Get list of favorite movies
function getFavoriteMovies(container) {
    // get favorites from localstorage, or initialize the variable to empty string if there are no favorites
    var favorites = localStorage.getItem('favorites') && localStorage.getItem('favorites').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let f = favorites.length ? JSON.parse(favorites) : [];
    //remove duplicates if there are any
    let fav = [...new Set(f)];

    // if there are no favorite movies, display a text
    if (!fav.length) {
        var element = `<h3 class="mt-5">You don't have favorite movies</h3>
                        <p>Explore what is popular now</p>
                        <button class="btn bg-dark"><a href="./index.html" class="text-white">Explore</a></button>`
        // append the text to the container
        container.append(element);
    } else {
        // for each favorite movie, get its details
        fav.forEach(id => {
            // ajax call for getting movie by id
            $.ajax(`${url}/movie/${id}?${apiKey}`, {
                // A function to be called when the request finishes
                complete: function (response) {
                    // get the JSON object from the response 
                    movie = response.responseJSON;

                    // create card for the movie with its info
                    var element = `<div class="card mb-3">
                                    <div class="row no-gutters">
                                        <div class="col-auto p-3">
                                            <img src="https://image.tmdb.org/t/p/w154${movie.poster_path}" alt="">
                                        </div>
                                        <div class="col p-3">
                                            <div class="card-block px-2">
                                                <div class="row justify-content-between m-0">
                                                    <h4 class="card-title">${movie.title}</h4>
                                                    <button class="btn btn-dark" onclick="removeFromFavorite(${movie.id})"><i class="fa fa-heart-o" style="font-size: 20px""></i> Remove from Favorite</button>
                                                </div>
                                                <p class="card-text text-justify">${movie.overview}</p>
                                                <p>Release date: ${new Date(movie.release_date).toDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer w-100 text-muted">
                                        <a href="./details.html?id=${movie.id}">Show details about this movie</a>
                                    </div>
                            </div>`;

                    // append the card to the container
                    container.append(element);
                }
            });
        })

    }
}


// remove movie from favorite list
function removeFromFavorite(movieId) {
    // the container where the movie will be appended
    var container = $('#favorites');
    // get favorites from localstorage
    var favorites = localStorage.getItem('favorites').split(',');
    // localstorage keeps data as string, we need to convert it to array
    let fav = JSON.parse(favorites);
    // remove movieId from favorite list
    var result = fav.filter(elem => elem != movieId);
    // save the modified array in localstorage
    localStorage.setItem('favorites', JSON.stringify(result));
    // remove everything from the container
    container.empty();
    // refresh the list with favorite movies
    this.getFavoriteMovies(container);
}


// Get list of to watch movies
function getToWatchMovies(container) {
    // get to watch movies from localstorage, or initialize the variable to empty string if there are no to watch movies
    let watch = localStorage.getItem('watch') && localStorage.getItem('watch').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let ww = watch.length ? JSON.parse(watch) : [];
    //remove duplicates if there are any
    let w = [...new Set(ww)];

    // if there are no favorite movies, display a text
    if (!w.length) {
        let element = `<h3 class="mt-5">You don't have 'to watch' movies</h3>
                        <p>Explore what is popular now</p>
                        <button class="btn bg-dark"><a href="./index.html" class="text-white">Explore</a></button>`
        // append the text to the container
        container.append(element);
    } else {
        // for each favorite movie, get its details
        w.forEach(id => {
            // ajax call for getting movie by id
            $.ajax(`${url}/movie/${id}?${apiKey}`, {
                // A function to be called when the request finishes
                complete: function (response) {
                    // get the JSON object from the response 
                    movie = response.responseJSON;

                    // create card for the movie with its info
                    let element = `<div class="card mb-3">
                                    <div class="row no-gutters">
                                            <div class="col-auto p-3">
                                                <img src="https://image.tmdb.org/t/p/w154${movie.poster_path}" alt="">
                                            </div>
                                            <div class="col p-3">
                                                <div class="card-block px-2">
                                                    <div class="row justify-content-between m-0">
                                                        <h4 class="card-title">${movie.title}</h4>
                                                        <div>
                                                            <button class="btn btn-dark" onclick="addToFavorite(${movie.id})"><i class="fa fa-heart-o" style="font-size: 20px""></i> Add to Favorite</button>
                                                            <button class="btn btn-dark" onclick="removeFromWatchAddToWatched(${movie.id})"><i class="fa fa-eye-slash" style="font-size: 20px""></i> Add to Watched</button>
                                                        </div>
                                                    </div>
                                                    <p class="card-text text-justify">${movie.overview}</p>
                                                    <p>Release date: ${new Date(movie.release_date).toDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer w-100 text-muted">
                                            <a href="./details.html?id=${movie.id}">Show details about this movie</a>
                                        </div>
                                </div>`;

                    // append the card to the container
                    container.append(element);
                }
            });
        })
    }
}


// add items to watched list - we will keep the ids of the movies in localstorage and remove it from to watch list
function removeFromWatchAddToWatched(movieId) {
    // get watched movies from localstorage, or initialize the variable to empty string if there are no watched movies
    let watched = localStorage.getItem('watched') && localStorage.getItem('watched').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let wed = watched.length ? JSON.parse(watched) : [];
    // add the movie to the array of favorites
    wed.push(movieId);
    // save the modified array in localstorage
    localStorage.setItem('watched', JSON.stringify(wed));

    // get to watch from localstorage
    let to_watch = localStorage.getItem('watch').split(',');
    // localstorage keeps data as string, we need to convert it to array
    let w = JSON.parse(to_watch);
    // remove movieId from to_watch list
    let result = w.filter(elem => elem != movieId);
    // save the modified array in localstorage
    localStorage.setItem('watch', JSON.stringify(result));
    // the container where the movie will be appended
    let container = $('#watch');
    // remove everything from the container
    container.empty();
    // refresh the list with favorite movies
    getToWatchMovies(container);
}


function getWatchedMovies(container) {
    // get watched movies from localstorage, or initialize the variable to empty string if there are no to watch movies
    let watched = localStorage.getItem('watched') && localStorage.getItem('watched').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let wwed = watched.length ? JSON.parse(watched) : [];
    //remove duplicates if there are any
    let wed = [...new Set(wwed)];

    // if there are no favorite movies, display a text
    if (!wed.length) {
        let element = `<h3 class="mt-5">You don't have watched movies</h3>
                        <p>Explore what is popular now</p>
                        <button class="btn bg-dark"><a href="./index.html" class="text-white">Explore</a></button>`
        // append the text to the container
        container.append(element);
    } else {
        // for each favorite movie, get its details
        wed.forEach(id => {
            // ajax call for getting movie by id
            $.ajax(`${url}/movie/${id}?${apiKey}`, {
                // A function to be called when the request finishes
                complete: function (response) {
                    // get the JSON object from the response 
                    movie = response.responseJSON;

                    // create card for the movie with its info
                    let element = `<div class="card mb-3">
                                    <div class="row no-gutters">
                                        <div class="col-auto p-3">
                                            <img src="https://image.tmdb.org/t/p/w154${movie.poster_path}" alt="">
                                        </div>
                                        <div class="col p-3">
                                            <div class="card-block px-2">
                                                <div class="row justify-content-between m-0">
                                                    <h4 class="card-title">${movie.title}</h4>
                                                    <div>
                                                        <button class="btn btn-dark" onclick="addToFavorite(${movie.id})"><i class="fa fa-heart-o" style="font-size: 20px""></i> Add to Favorite</button>
                                                        <button class="btn btn-dark" onclick="removeFromWatched(${movie.id})"><i class="fa fa-eye-slash" style="font-size: 20px""></i> Remove From Watched</button>
                                                    </div>
                                                </div>
                                                <p class="card-text text-justify">${movie.overview}</p>
                                                <p>Release date: ${new Date(movie.release_date).toDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer w-100 text-muted">
                                        <a href="./details.html?id=${movie.id}">Show details about this movie</a>
                                    </div>
                            </div>`;

                    // append the card to the container
                    container.append(element);
                }
            });
        })

    }
}


// add items to favorite list - we will keep the ids of the movies in localstorage
function addToFavorite(movieId) {
    // get favorites from localstorage, or initialize the variable to empty string if there are no favorites
    let favorites = localStorage.getItem('favorites') && localStorage.getItem('favorites').split(',') || [];
    // localstorage keeps data as string, we need to convert it to array
    let fav = favorites.length ? JSON.parse(favorites) : [];
    // add the movie to the array of favorites
    fav.push(movieId);
    // save the modified array in localstorage
    localStorage.setItem('favorites', JSON.stringify(fav));
}


// remove the movie from watched list
function removeFromWatched(movieId) {
    // get watched movies from localstorage
    let watched = localStorage.getItem('watched').split(',');
    // localstorage keeps data as string, we need to convert it to array
    let wed = JSON.parse(watched);
    // remove movieId from watched list
    let result = wed.filter(elem => elem != movieId);
    // save the modified array in localstorage
    localStorage.setItem('watched', JSON.stringify(result));
    // the container where the movie will be appended
    let container = $('#watched');
    // remove everything from the container
    container.empty();
    // refresh the list with favorite movies
    getWatchedMovies(container);
}