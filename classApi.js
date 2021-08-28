function getWeather() {
  let zip = document.getElementById("zipCode").value;
  let units = document.getElementById("units").value;

  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);

  if (isValidZip === true) {
    if (
      document.getElementById("weather").value != `` ||
      document.getElementById("contain").value != ``
    ) {
      document.getElementById("weather").innerHTML = ``;
      document.getElementById("outside").innerHTML = ``;
    }
    let href =
      `https://api.openweathermap.org/data/2.5/weather?zip=` +
      zip +
      `&appid=25fd2b84e9296987fb359f25033af609&units=` +
      units;
    fetch(href)
      .then((res) => res.json())
      .then((weather) => {
        document.getElementById(
          `header`
        ).innerHTML = `Current Weather for ${weather.name}`;
        let units = document.getElementById("units").value;
        let tempUnt;
        let windUnt;
        if (units == `metric`) {
          tempUnt = `C`;
          windUnt = `KPH`;
        } else {
          tempUnt = `F`;
          windUnt = `MPH`;
        }
        let icon =
          `http://openweathermap.org/img/wn/` +
          weather.weather[0].icon +
          `@2x.png`;
        let wind = weather.wind.deg;
        var degToCard = function (deg) {
          if (deg > 11.25 && deg < 33.75) {
            return "NNE";
          } else if (deg > 33.75 && deg < 56.25) {
            return "ENE";
          } else if (deg > 56.25 && deg < 78.75) {
            return "E";
          } else if (deg > 78.75 && deg < 101.25) {
            return "ESE";
          } else if (deg > 101.25 && deg < 123.75) {
            return "ESE";
          } else if (deg > 123.75 && deg < 146.25) {
            return "SE";
          } else if (deg > 146.25 && deg < 168.75) {
            return "SSE";
          } else if (deg > 168.75 && deg < 191.25) {
            return "S";
          } else if (deg > 191.25 && deg < 213.75) {
            return "SSW";
          } else if (deg > 213.75 && deg < 236.25) {
            return "SW";
          } else if (deg > 236.25 && deg < 258.75) {
            return "WSW";
          } else if (deg > 258.75 && deg < 281.25) {
            return "W";
          } else if (deg > 281.25 && deg < 303.75) {
            return "WNW";
          } else if (deg > 303.75 && deg < 326.25) {
            return "NW";
          } else if (deg > 326.25 && deg < 348.75) {
            return "NNW";
          } else {
            return "N";
          }
        };
        document.getElementById("weather").classList.add("Weather");
        document.getElementById("weather").innerHTML = `
        <div class="vcontain" id="forbox" style="background-color: green">
        <div class="hcontain" id="local">
          <h1>${weather.name}, ${weather.sys.country}</h1>
        </div>
        <div class="hcontain" id="info">
          <div class="icon">
            <div class="vcontain" id="icon-dis">
              <img id="current_img" src="${icon}" alt="" />
              <p id="discript">${weather.weather[0].description}</p>
            </div>
          </div>
          <div class="temp_press">
            <div class="vcontain">
              <div class="temp">${weather.main.temp}°${tempUnt}</div>
              <div class="press">${weather.main.pressure} mb</div>
              <div id="wind">${weather.wind.speed}${windUnt} ${degToCard(wind)}</div>
            </div>
          </div>
        </div>
      </div>
      `;
      });
  } else {
    document.getElementById("weather").classList.add("Weather");
    document.getElementById("weather").innerHTML = `<h2>Invalid Zip code<h2>`;
  }
}
// Forcast
function getForcast() {
  if (
    document.getElementById("weather").value != `` ||
    document.getElementById("contain").value != ``
  ) {
    document.getElementById("weather").innerHTML = ``;
    document.getElementById("outside").innerHTML = ``;
  }
  let zip = document.getElementById("zipCode").value;
  let units = document.getElementById("units").value;
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  if (isValidZip === true) {
    let hrefwether =
      `https://api.openweathermap.org/data/2.5/forecast?zip=` +
      zip +
      `&appid=25fd2b84e9296987fb359f25033af609&units=` +
      units;
    fetch(hrefwether)
      .then((res) => res.json())
      .then((weatherRep) => {
        let i = 0;
        if (units == `metric`) {
          tempUnt = `C`;
          windUnt = `KPH`;
        } else {
          tempUnt = `F`;
          windUnt = `MPH`;
        }
        function convert(unixtimestamp) {
          var months_arr = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          var date = new Date(unixtimestamp * 1000);
          var year = date.getFullYear();
          var month = months_arr[date.getMonth()];
          var day = date.getDate();
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var convdataTime =
            month +
            "-" +
            day +
            "-" +
            year +
            " " +
            hours +
            ":" +
            minutes.substr(-2) +
            ":" +
            seconds.substr(-2);
          return convdataTime;
        }
        document.getElementById(
          `header`
        ).innerHTML = `Weather Forcast for ${weatherRep.city.name}`;
        let str = ``;
        for (i = 0; i < weatherRep.list.length; i++) {
          let icon = weatherRep.list[i].weather[0].icon;
          let hreficon = `http://openweathermap.org/img/wn/` + icon + `@2x.png`;
          str += `
          <div class="contain" id="inside">
            <h3 class="carditem">${convert(weatherRep.list[i].dt)}</h3>
            <img src="${hreficon}" alt="" class="carditem" id="img">
            <h3 class="carditem">Temp: ${
              weatherRep.list[i].main.temp
            }°${tempUnt}</h3>
            <p class="carditem">Feels like:${
              weatherRep.list[i].main.feels_like
            }°${tempUnt}</p>
            <p class="carditem">${weatherRep.list[i].weather[0].description}</p>
          </div>
          `;
        }
        document.getElementById(`outside`).innerHTML = str;
      });
  } else {
    document.getElementById("weather").classList.add("Weather");
    document.getElementById("weather").innerHTML = `<h2>Invalid Zip code<h2>`;
  }
}
