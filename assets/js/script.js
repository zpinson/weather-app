var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var cityList = document.querySelector('#city-list')
var query = "";
var day1El = document.getElementById("forcast-1");
var day2El = document.getElementById("forcast-2");
var day3El = document.getElementById("forcast-3");
var day4El = document.getElementById("forcast-4");
var day5El = document.getElementById("forcast-5");
var lat = [];
var lon = [];
var storage = ''
var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");
    var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");
  


function printResults(resultObj) {
  console.log(resultObj);

resultBody.innerHTML = ''
resultCard.innerHTML = ''
  
  

resultCard.append(resultBody);

  var titleEl = document.getElementById("city");
  titleEl = resultObj.name + " " + " ";
  var iconEl = document.createElement("img");
  iconEl.setAttribute(
    "scr",
    "http://openweathermap.org/img/wn/" + resultObj.weather[0].icon + ".png"
  );
  iconEl.setAttribute("height", 20);
  iconEl.setAttribute("width", 20);
 
  console.log(iconEl);

  var bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    "<strong>Temperature:</strong> " + resultObj.main.temp + " °F" + "<br/>";

  if (resultObj.wind.speed) {
    bodyContentEl.innerHTML +=
      "<strong>Wind :</strong> " + resultObj.wind.speed + " MPH" + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.main.humidity) {
    bodyContentEl.innerHTML +=
      "<strong>Humidity:</strong> " + resultObj.main.humidity + "%";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }

  
  resultBody.append(titleEl, iconEl, bodyContentEl);

  resultContentEl.append(resultCard);
}

function searchApi(query) {
  var dailyQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  dailyQueryUrl =
    dailyQueryUrl +
    query +
    "&units=imperial&appid=761abc21a5ef3b9c3b8091ff8bfe192a";
  console.log(dailyQueryUrl);
  fetch(dailyQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (dailyRes) {
      // write query to page so user knows what they are viewing
      //   resultTextEl.textContent = locRes.search.query;

      // console.log(dailyRes.coord.lat);

      lat = dailyRes.coord.lat;
      lon = dailyRes.coord.lon;

      if (!dailyRes) {
        console.log("No results found!");
        resultContentEl.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        resultContentEl.textContent = "";

        printResults(dailyRes);
      }
      console.log(
        "LATITUDE*******************",
        dailyRes.coord.lat,
        dailyRes.coord.lon
      );
      uvIndex(dailyRes.coord.lat, dailyRes.coord.lon);
    })
    .catch(function (error) {
      console.error(error);
    });

  var forcastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";

  forcastQueryUrl =
    forcastQueryUrl +
    query +
    "&units=imperial&appid=761abc21a5ef3b9c3b8091ff8bfe192a";
  console.log(forcastQueryUrl);
  fetch(forcastQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (forcastRes) {
      // write query to page so user knows what they are viewing
      //   resultTextEl.textContent = locRes.search.query;
      console.log(forcastRes);

      day1El.innerHTML = "";
      day2El.innerHTML = "";
      day3El.innerHTML = "";
      day4El.innerHTML = "";
      day5El.innerHTML = "";

      var date1 = document.createElement("h5");
      date1.innerHTML = forcastRes.list[3].dt_txt.slice(0, 10);
      // date1.innerHTML = "YAY";
      console.log(forcastRes);
      var icon1 = document.createElement("img");
      icon1.setAttribute(
        "scr",
        "http://openweathermap.org/img/wn/" +
          forcastRes.list[3].weather[0].icon +
          ".png"
      );
      console.log(icon1);
      icon1.setAttribute("height", 20);
      icon1.setAttribute("width", 20);

      var info1 = document.createElement("p");
      info1.innerHTML =
        "<strong>Temperature:</strong> " +
        forcastRes.list[3].main.temp +
        " °F" +
        "<br/>";
      info1.innerHTML +=
        "<strong>Humidity:</strong> " + forcastRes.list[3].main.humidity + "%";

      day1El.append(date1, icon1, info1);

      var date2 = document.createElement("h5");
      date2.innerHTML = forcastRes.list[11].dt_txt.slice(0, 10);

      var icon2 = document.createElement("img");
      icon2.setAttribute(
        "scr",
        "http://openweathermap.org/img/w/" +
          forcastRes.list[11].weather[0].icon +
          ".png"
      );

      icon2.setAttribute("height", 20);
      icon2.setAttribute("width", 20);

      var info2 = document.createElement("p");
      info2.innerHTML =
        "<strong>Temperature:</strong> " +
        forcastRes.list[11].main.temp +
        " °F" +
        "<br/>";
      info2.innerHTML +=
        "<strong>Humidity:</strong> " + forcastRes.list[11].main.humidity + "%";

      day2El.append(date2, icon2, info2);

      var date3 = document.createElement("h5");
      date3.innerHTML = forcastRes.list[19].dt_txt.slice(0, 10);

      var icon3 = document.createElement("img");
      icon3.setAttribute(
        "scr",
        "http://openweathermap.org/img/wn/" +
          forcastRes.list[19].weather[0].icon +
          ".png"
      );

      icon3.setAttribute("height", 20);
      icon3.setAttribute("width", 20);

      var info3 = document.createElement("p");
      info3.innerHTML =
        "<strong>Temperature:</strong> " +
        forcastRes.list[19].main.temp +
        " °F" +
        "<br/>";
      info3.innerHTML +=
        "<strong>Humidity:</strong> " + forcastRes.list[19].main.humidity + "%";

      day3El.append(date3, icon3, info3);

      var date4 = document.createElement("h5");
      date4.innerHTML = forcastRes.list[27].dt_txt.slice(0, 10);

      var icon4 = document.createElement("img");
      icon4.setAttribute(
        "scr",
        "http://openweathermap.org/img/wn/" +
          forcastRes.list[27].weather[0].icon +
          ".png"
      );

      icon4.setAttribute("height", 20);
      icon4.setAttribute("width", 20);

      var info4 = document.createElement("p");
      info4.innerHTML =
        "<strong>Temperature:</strong> " +
        forcastRes.list[27].main.temp +
        " °F" +
        "<br/>";
      info4.innerHTML +=
        "<strong>Humidity:</strong> " + forcastRes.list[27].main.humidity + "%";

      day4El.append(date4, icon4, info4);

      var date5 = document.createElement("h5");
      date5.innerHTML = forcastRes.list[35].dt_txt.slice(0, 10);

      var icon5 = document.createElement("img");
      icon5.setAttribute(
        "scr",
        "http://openweathermap.org/img/wn/" +
          forcastRes.list[35].weather[0].icon +
          ".png"
      );

      icon5.setAttribute("height", 20);
      icon5.setAttribute("width", 20);

      var info5 = document.createElement("p");
      info5.innerHTML =
        "<strong>Temperature:</strong> " +
        forcastRes.list[35].main.temp +
        " °F" +
        "<br/>";
      info5.innerHTML +=
        "<strong>Humidity:</strong> " + forcastRes.list[35].main.humidity + "%";

      day5El.append(date5, icon5, info5);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function uvIndex(lat, lon) {
  var uvQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=";

  console.log(lat);
  console.log(lon);

  uvQueryUrl =
    uvQueryUrl +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=761abc21a5ef3b9c3b8091ff8bfe192a";
  console.log(uvQueryUrl);
  fetch(uvQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (uvRes) {
      // write query to page so user knows what they are viewing
      //   resultTextEl.textContent = locRes.search.query;
      console.log(uvRes);
      document.getElementById('date').innerHTML = '<h2>Weather bultin for: ' + uvRes.date_iso.slice(0, 10) + '</h2>'
      var uvEl = document.createElement('p')
      uvEl.innerHTML =   "<strong>UV index:</strong> " + uvRes.value;
      
      if(uvRes.value <= 3){
      uvEl.classList.add('bg-success')
      }else if (uvRes.value <= 7){
        uvEl.classList.add('bg-warning')
      }else{
        uvEl.classList.add('bg-danger')
      }

      uvEl.classList.add('col-2')
      resultBody.append(uvEl)
      document
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;
  query = searchInputVal;
  console.log(query);
  var cityButton = document.createElement('button')
  cityButton.innerHTML = query
  cityButton.classList.add('col-10')
  cityButton.classList.add('offset-1')
  cityList.append(cityButton)
  cityButton.addEventListener('click', function(){
    searchApi(cityButton.innerHTML)
  })
  var city = localStorage.getItem('city')
  console.log(city)

 
 storage = localStorage.getItem('city')
 if (storage) { 
 storage += query + ','
 console.log(storage)
 } else{
  storage = query + ','
 }
console.log(storage)
  localStorage.setItem('city', storage)

  
searchApi(query);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

function getstorage(){
  var storageArr = localStorage.getItem('city').split(',')
  console.log(storageArr)
  for (var i= 0; i < storageArr.length -1; i++) {
    var cityBtn = document.createElement('button')
  cityBtn.innerHTML = storageArr[i]
  cityBtn.classList.add('col-10')
  cityBtn.classList.add('offset-1')
  cityList.append(cityBtn)
  }
}

getstorage()

console.log(document.getElementById('city-list').children[0].innerHTML)

  document.getElementById('city-list').children[0].addEventListener('click', function(){
 searchApi(document.getElementById('city-list').children[0].innerHTML)
})
document.getElementById('city-list').children[1].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[1].innerHTML)
 })
 document.getElementById('city-list').children[2].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[2].innerHTML)
 })
 document.getElementById('city-list').children[3].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[3].innerHTML)
 })
 document.getElementById('city-list').children[4].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[4].innerHTML)
 })
 document.getElementById('city-list').children[5].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[5].innerHTML)
 })
 document.getElementById('city-list').children[6].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[6].innerHTML)
 })
 document.getElementById('city-list').children[7].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[7].innerHTML)
 })
 document.getElementById('city-list').children[8].addEventListener('click', function(){
  searchApi(document.getElementById('city-list').children[8].innerHTML)
 })
         
   
  



