import {
  getCurrentDateTime,
  getWindDirectionSymbol,
  calculateDewPoint,
  getWeatherForecastData
} from "./utils.js";

export const renderWidgetToday = (widget, data) => {
  const { dayOfMonth, month, year, hours, minutes, dayOfMWeek } = getCurrentDateTime();

  widget.insertAdjacentHTML(
    'beforeend',
    `
  <div class="widget__today">
    <div class="widget__date-block">
      <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
      <p class="widget__time">${hours}:${minutes}</p>
      <p class="widget__day">${dayOfMWeek}</p>
    </div>
    <div class="widget__icon">
      <img class="widget__img" src="./src/icons/${data.weather[0].icon}.svg" alt="Погода">
    </div>
    <div class="widget__wheather">
      <div class="widget__city">
        <p>${data.name}</p>
        <button class="widget__change-city" aria-label="Изменить город"></button>
      </div>
      <p class="widget__temp-big">${(data.main.temp - 273.15).toFixed(1)}°C</p>
      <p class="widget__felt">ощущается</p>
      <p class="widget__temp-small">${(data.main.feels_like - 273.15).toFixed(1)}°C</p>
    </div>
  </div>
  `
  )
};

export const renderWidgetOther = (widget, data) => {
  const windDirection = getWindDirectionSymbol(data.wind.deg)
  const dewPoint = calculateDewPoint(data.main.temp, data.main.humidity)
  widget.insertAdjacentHTML(
    'beforeend',
    `
  <div class="widget__other">
    <div class="widget__wind">
      <p class="widget__wind-title">Ветер</p>
      <p class="widget__wind-speed">${(data.wind.speed).toFixed(1)} м/с</p>
      <p class="widget__wind-text">${windDirection}</p>
    </div>
    <div class="widget__humidity">
      <p class="widget__humidity-title">Влажность</p>
      <p class="widget__humidity-value">${data.main.humidity}%</p>
      <p class="widget__humidity-text">Т.Р: ${dewPoint} °C</p>
    </div>
    <div class="widget__pressure">
      <p class="widget__pressure-title">Давление</p>
      <p class="widget__pressure-value">${(data.main.pressure * 0.75006).toFixed(1)}</p>
      <p class="widget__pressure-text">мм рт.ст.</p>
    </div>
  </div>
  `
  )
};

export const renderWidgetForecast = (widget, data) => {

  console.log(data);

  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast'
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData(data.data);

  const items = forecastData.map((item) => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';

    widgetDayItem.insertAdjacentHTML('beforeend', `
      <p class="widget__day-text">${item.dayOfWeek}</p>
      <img class="widget__day-img" src="./src/icons/${item.weatherIcon}.svg" alt="Погода">
      <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°/${(item.maxTemp - 273.15).toFixed(1)}°</p>
    `)
    return widgetDayItem;
  })

  widgetForecast.append(...items )
}

export const showError = (widget, error) => {
  widget.textContent = error.toString;
  widget.classList.add('widget_error');
}