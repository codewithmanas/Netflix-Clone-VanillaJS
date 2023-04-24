// constants
const apiKey = "f4ab855768919f903a1dbec7381fa877";
const apiEndPoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
    fetchAllTrendingMovies: `${apiEndPoint}/trending/movie/day?api_key=${apiKey}`,
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesList: (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyC0SZJkHFX-fQ7NrsxdI4l4mGwYuY4l7P8`
}


// Boot up the app
function init() {
    fetchAndBuildAllSections();
}


function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(data => {
        const categories = data.genres;
        if(Array.isArray(categories) && categories.length){
            categories.slice(0, 5).forEach(category => {
                fetchAndBuildMovieSections(apiPaths.fetchMoviesList(category.id), category.name);
            })
        }
    })
    .catch(err => console.error(err))
}

function fetchAndBuildMovieSections(fetchUrl, categoryName){
    // console.log(fetchUrl);
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        // console.log(data.results)
        const movies = data.results;
        if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies, categoryName);
        }
    })
    .catch(err => console.error(err))
}

function buildMoviesSection(movies, categoryName){
        console.log(movies, categoryName);

        const moviesCont = document.getElementById("movies-cont");

        const moviesListHTML = movies.map(item => {
            return `
            <img class="movies-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
            `
        }).join("");

        const moviesSectionHTML = `
            <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
            <div class="movies-row">
                ${moviesListHTML}
            </div>
        `;

        const div = document.createElement("div");
        div.className = "movies-section";
        div.innerHTML = moviesSectionHTML
        
        // append html into movies container
        moviesCont.append(div);
}


// app loading
window.addEventListener("load", function(){
    init();
})