console.log('loaded main script: scripts.js')
let apiKey = "25f5197a6071bfb1c1a6d6ad59c06031"; //API KEY FOR WEATHER DATA
let nasaAPI = "6ypJt7275Q4YQheygUWbl2h8fxunZlJdHxXT7H9q"; //API KEY FOR NASA "EARTH" API
let apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" //API CALL BASED ON CITY NAME
let date = moment().subtract(11, 'days').format('YYYY' + '-' + 'MM' + '-' + 'DD');
console.log("using date of: " + date);
console.log(date)
import './map';
// let hM = document.createElement('map.js');
// hM.src = "./map.js"
// document.head.appendChild(hM);
let mLat, mLon;

$("#searchBtn").on("click", function () {
    event.preventDefault();
    let cityString = $("#city").val();
    getLatLon(cityString);
});

function getLatLon(cityString) {
    console.log(city)
    let queryURL = apiCall + cityString + "&appid=" + apiKey
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;
        let pop = response.city.population;
        mLat = lat;
        mLon = lon;
        console.log(pop);
        console.log(lat);
        console.log(lon);
        //getMap(lat, lon);
        $("#stats").html('');
        $("#stats").html("Population: " + pop);
        performNasaCall(lon, lat);
    })
};

function performNasaCall(lon,lat) {
    console.log("performNasaCall function was called");
    let nasaURL = "https://api.nasa.gov/planetary/earth/assets?lon=" + lon + "&lat=" + lat + "&date="+ date + "&dim=0.50&api_key=" + nasaAPI; //date format - YYYY/MM/DD
    $.ajax({
        url: nasaURL,
        method: "GET",
    }).then(function (response) {
        console.log("res below");
        console.log(response);
        let lanSatURL = response.url;
        let lanSatDateTime = response.date;
        console.log(lanSatURL);
        buildLanSatImg(lanSatURL, lanSatDateTime.slice(0,10));
    });

}

$(document).ajaxStop(function(){
   resize();
});

function buildLanSatImg(lanSatURL, lanSatDateTime) {
    $("#lanSatImgHolder").html('');
    $(".image").html('');
    $("#lanSatImgHolder").append("<img id=satImg src=" + lanSatURL + ">");
    $(".image").append("<img id=satImg src=" + lanSatURL + ">");
    $("#lanSatImgHolder").append("<p>" + "Image taken : " + lanSatDateTime + "</p>");
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
    getLatLon("Green Valley");
    console.log("made initial call");
}


init();