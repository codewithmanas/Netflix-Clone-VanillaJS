// constants
const apiKey = "f4ab855768919f903a1dbec7381fa877";
const apiEndPoint = "https://api.themoviedb.org/3";
const apiCallUrl = `${apiEndPoint}/trending/all/day?api_key=${apiKey}`;

const apiPaths = {
    fetchAllTrendingMovies: `${apiEndPoint}/trending/movie/day?api_key=${apiKey}`,
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
}


// Boot up the app
function init() {

    fetchAndBuildAllSections();
}

// function buildAllTrendingMoviesSection(data){
//         const movieSection = document.querySelector(".movie-section");
//         movieSection.innerHTML = data.results[0].title;
// }

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(data => {
        const categories = data.genres;
        if(Array.isArray(categories) && categories.length){
            categories.forEach(category => fetchAndBuildSections(category))
        }
        // console.log(categories);
    })
    .catch(err => console.error(err))
}

function fetchAndBuildSections(item){
    console.log(item);
}


// app loading
window.addEventListener("load", function(){
    init();
})