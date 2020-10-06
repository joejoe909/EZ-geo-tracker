let apiKey = "beec6cc5881d930f74eb86a67a7a1dae"; //API KEY FOR WEATHER DATA
let nasaAPI = "0XQbhctwQoswCaA4cSRpTVQqurJiqw1yI3vidInC"; //API KEY FOR NASA "EARTH" API
let apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" //API CALL BASED ON CITY NAME
let date = moment().format('YYYY' + '-' + 'MM' + '-' + 'DD')
console.log(date)
let hM = document.createElement('map.js');
hM.src = "./map.js"
document.head.appendChild(hM);
let mLat, mLon;



$("#searchBtn").on("click", function () {
    event.preventDefault();
    let cityString = $("#city").val();
    getLatLon(cityString);
});

function getLatLon(burrito) {
    console.log(city)
    let queryURL = apiCall + burrito + "&appid=" + apiKey
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        let latitude = response.city.coord.lat;
        let longitude = response.city.coord.lon;
        let population = response.city.population;
        mLat = latitude;
        mLon = longitude;
        console.log(population);
        console.log(latitude);
        console.log(longitude);
        performNasaCall(latitude, longitude, population);
    })
};

// getLatLon();

function performNasaCall(enchilada1, enchilada2, enchilada3) {
    let nasaURL = "https://api.nasa.gov/planetary/earth/assets?lon=" + enchilada2 + "&lat=" + enchilada1 + "&date=" + date + "&&dim=0.50&api_key=" + nasaAPI; //date format - YYYY/MM/DD
    $.ajax({
        url: nasaURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        let lanSatURL = response.url;
        let lanSatDateTime = response.date.slice(0, 10) + " at " +
            response.date.slice(11, 19);
        let pop = enchilada3;
        console.log(lanSatURL);
        buildLanSatImg(lanSatURL, lanSatDateTime, pop);
        console.log(enchilada3);
        console.log(pop);
    });

}

$(document).ajaxStop(function(){
   resize();
});

function buildLanSatImg(quesadilla1, quesadilla2, quesadilla3) {
    $("#lanSatImgHolder").html('');
    $(".image").html('');
    $("#stats").html('');
    $("#lanSatImgHolder").append("<img id=satImg src=" + quesadilla1 + ">");
    $(".image").append("<img id=satImg src=" + quesadilla1 + ">");
    $("#lanSatImgHolder").append("<p>" + "Image taken : " + quesadilla2 + "</p>");
    $("#stats").append("<p>" + "Population : " + quesadilla3 + "</p>");
    getMap(mLat, mLon);
}

var openModal = $("#openBtn")
var openBtn = $("#larger")
var closeModal = $("#closeBtn")

openBtn.on("click", function () {
    openModal.removeClass("modal").addClass("modal is-active")
})

closeModal.on("click", function () {
    openModal.removeClass("modal is-active").addClass("modal")
})


 function resize(){
     console.log("resize event");
     window.dispatchEvent(new Event('resize'));
 }

function init(){
    getLatLon("Tucson");
    console.log("made initial call");
}


init();