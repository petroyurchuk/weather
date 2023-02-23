const wrapperImg = document.querySelector(".wrapper-img");
const locationCity = document.querySelector(".location__city");
const locationCountry = document.querySelector(".location__country");
const tempr = document.querySelector(".tempr");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");
const deg = document.querySelector(".deg");
const description = document.querySelector(".description");
const scale = document.querySelector(".scale");
const inputCountry = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
let message = document.querySelector(".message");
searchBtn.addEventListener("click", findWheather);

function findWheather() {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${inputCountry.value}&units=metric&APPID=5d066958a60d315387d9492393935c19 `
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        document.querySelector(".container").style.display = "flex";
        message.textContent = "";
        wrapperImg.innerHTML = `<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'>`;
        locationCity.innerHTML = `${data.name},`;
        locationCountry.innerHTML = `${data.sys.country}`;
        tempr.innerHTML = `${Math.ceil(data.main.temp)} &#8451;`;
        if (Math.ceil(data.main.temp) > 0) {
          scale.style.cssText = `width:${Math.ceil(data.main.temp) * 20}px;`;
        }
        if (data.main.temp === 0) {
          scale.style.cssText = `
      width:10px;
      background-color:#ccc;
      `;
        }
        if (Math.ceil(data.main.temp) < 0) {
          scale.style.cssText = `
      width:${Math.ceil(data.main.temp) * -20}px;
      background-color:#6DCFF6;
      `;
        }
        pressure.innerHTML = `Pressure: ${data.main.pressure}`;
        humidity.innerHTML = `Humidity: ${data.main.humidity}`;
        speed.innerHTML = `Wind speed: ${data.wind.speed}`;
        deg.innerHTML = `Deg: ${data.wind.deg}`;
        description.innerHTML = `Description: ${data.weather[0].description}`;
      } else {
        message.style.color = "red";
        message.textContent = "Please type correct name of city";
      }
    });
}
