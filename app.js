// constants
// const apiKey = "";
// const baseUrl = "";
const apiCallUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=f4ab855768919f903a1dbec7381fa877`;


// Boot up the app
function init() {
    // console.log("App is loaded.");
    fetch(apiCallUrl)
    .then(res => res.json())
    .then(data => {
        const finalData = data.results; 
        finalData.forEach((item) => {
            console.log(item.title)
        })
        console.log(data.results[3].title)
    })
    .catch(err => console.error(err));
}


// app loading
window.addEventListener("load", function(){
    init();
})